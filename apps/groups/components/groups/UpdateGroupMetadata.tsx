'use client'

import { Permissions, ResultTx } from 'chora/components'
import { InputMetadata } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer, useSchema } from 'chora/hooks'
import { postData, postIpfs, signAndBroadcast } from 'chora/utils'
import { MsgUpdateGroupMetadata } from 'cosmos/api/cosmos/group/v1/tx'
import * as Long from 'long'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

import { GroupContext } from '@contexts/GroupContext'
import { usePermissionsAdmin } from '@hooks/usePermissionsAdmin'

import styles from './UpdateGroupMetadata.module.css'

const contextUrl = 'https://schema.chora.io/contexts/group.jsonld'

const UpdateGroupMetadata = () => {
  const { groupId } = useParams()

  const { metadata: initMetadata, metadataError } = useContext(GroupContext)
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  const [context, example, template, schemaError] = useSchema(contextUrl)

  const [isAdmin, isPolicy, isAuthz, permError] = usePermissionsAdmin(
    wallet,
    '/cosmos.group.v1.MsgUpdateGroupMetadata',
  )

  // error fetching initial parameters
  const initError = metadataError || schemaError || permError

  // input option
  const [input, setInput] = useState('schema-form')

  // metadata input
  const [json, setJson] = useState<string>('')

  // data storage
  const [dataStorage, setDataStorage] = useState<string>('json')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  // load and reset metadata
  useEffect(() => {
    if (initMetadata && !json) {
      setJson(JSON.stringify(initMetadata))
    }
  }, [initMetadata, json])

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
    const msg: MsgUpdateGroupMetadata = {
      $type: 'cosmos.group.v1.MsgUpdateGroupMetadata',
      admin: wallet.bech32Address,
      groupId: Long.fromString(groupId.toString() || '0'),
      metadata: metadata,
    }

    // convert message to protobuf any message
    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgUpdateGroupMetadata',
      value: MsgUpdateGroupMetadata.encode(msg).finish(),
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
            label: 'admin account',
            hasPermission: isAdmin,
          },
          {
            label: 'policy + member',
            hasPermission: isPolicy,
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

export default UpdateGroupMetadata
