'use client'

import { Permissions, ResultTx } from 'chora/components'
import { InputMetadata } from 'chora/components/forms'
import { InputMembers } from 'chora/components/forms/cosmos.group.v1'
import { AccountContext, WalletContext } from 'chora/contexts'
import { useNetworkServer, useSchema } from 'chora/hooks'
import { postData, postIpfs, signAndBroadcast } from 'chora/utils'
import { MsgCreateGroup } from 'cosmos/api/cosmos/group/v1/tx'
import { useContext, useEffect, useState } from 'react'

import styles from './CreateGroup.module.css'

const contextUrl = 'https://schema.chora.io/contexts/group.jsonld'

const CreateGroup = () => {
  const { authzGrantee, authzError } = useContext(AccountContext)
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  const [context, example, template, schemaError] = useSchema(contextUrl)

  // error fetching initial parameters
  const initError = authzError || schemaError

  // input option
  const [input, setInput] = useState('schema-form')

  // metadata input
  const [json, setJson] = useState<string>('')

  // message inputs
  const [members, setMembers] = useState<any[]>([])

  // data storage
  const [dataStorage, setDataStorage] = useState<string>('json')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  // account permissions
  const [isAuthz, setIsAuthz] = useState<boolean>(false)

  useEffect(() => {
    if (authzGrantee && wallet) {
      const authz = authzGrantee.find(
        (g: any) =>
          g.grant.authorization.msg === '/cosmos.group.v1.MsgCreateGroup',
      )
      setIsAuthz(authz ? true : false)
    }
  }, [authzGrantee, wallet])

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    if (!wallet) {
      setError('keplr wallet not found')
      return // do not continue
    }

    if ((dataStorage === 'ipfs' || dataStorage === 'server') && !serverUrl) {
      setError('server url not found')
      return // do not continue
    }

    let metadata: string = ''

    // TODO: handle string metadata

    // handle json metadata
    if (json.length > 0) {
      let parsed: any = null

      // try to parse JSON
      try {
        parsed = JSON.parse(json)
      } catch (err) {
        setError('invalid json')
        return // do not continue
      }

      // handle data storage json
      if (dataStorage === 'json') {
        delete parsed['@context']
        metadata = JSON.stringify(parsed)
      }

      // handle data storage ipfs
      if (dataStorage === 'ipfs' && serverUrl) {
        await postIpfs(parsed, network, serverUrl)
          .then((res) => {
            metadata = res
          })
          .catch((err) => {
            setError(err)
          })
      }

      // handle data storage server
      if (dataStorage === 'server' && serverUrl) {
        await postData(parsed, network, serverUrl)
          .then((res) => {
            metadata = res
          })
          .catch((err) => {
            setError(err)
          })
      }
    }

    // set message
    const msg: MsgCreateGroup = {
      $type: 'cosmos.group.v1.MsgCreateGroup',
      admin: wallet.bech32Address,
      members: members,
      metadata: metadata,
    }

    // convert message to protobuf any message
    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgCreateGroup',
      value: MsgCreateGroup.encode(msg).finish(),
    }

    // sign and broadcast message to selected network
    await signAndBroadcast(chainInfo, wallet.bech32Address, [msgAny])
      .then((res) => {
        setSuccess(res)
      })
      .catch((err) => {
        if (err.message === "Cannot read properties of null (reading 'key')") {
          setError('keplr account does not exist on the selected network')
        } else {
          setError(err.message)
        }
      })
  }

  const handleUseTemplate = () => {
    if (template) {
      setJson(template)
    }
  }

  return (
    <div className={styles.box}>
      <Permissions
        permissions={[
          {
            label: 'new admin',
            hasPermission: true,
          },
          {
            label: 'authz grantee',
            hasPermission: isAuthz,
          },
        ]}
      />
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputMetadata
          network={network}
          input={input}
          setInput={setInput}
          json={json}
          setJson={setJson}
          context={context}
          example={example}
          useTemplate={handleUseTemplate}
          dataStorage={dataStorage}
          setDataStorage={setDataStorage}
        />
        <hr />
        <InputMembers
          id="group-members"
          network={network}
          members={members}
          setMembers={setMembers}
        />
        <hr />
        <button type="submit">{'submit'}</button>
      </form>
      <ResultTx
        error={initError || error}
        rest={chainInfo?.rest}
        success={success}
      />
    </div>
  )
}

export default CreateGroup
