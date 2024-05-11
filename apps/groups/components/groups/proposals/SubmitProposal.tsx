'use client'

import { Permissions, ResultTx } from 'chora/components'
import {
  InputMessages,
  InputMetadata,
  SelectAccount,
} from 'chora/components/forms'
import { SelectExecution } from 'chora/components/forms/cosmos.group.v1'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer, useSchema } from 'chora/hooks'
import { postData, postIpfs, signAndBroadcast } from 'chora/utils'
import { execFromJSON, MsgSubmitProposal } from 'cosmos/api/cosmos/group/v1/tx'
import { useContext, useState } from 'react'

import { GroupContext } from '@contexts/GroupContext'
import { usePermissionsMember } from '@hooks/usePermissionsMember'
import { useGroupPoliciesWithMetadata } from '@hooks/useGroupPoliciesWithMetadata'

import styles from './SubmitProposal.module.css'

const contextUrl = 'https://schema.chora.io/contexts/group_proposal.jsonld'

const SubmitProposal = () => {
  const { policies, policiesError } = useContext(GroupContext)
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  const [context, example, template, schemaError] = useSchema(contextUrl)

  const [isMember, isAuthz, permError] = usePermissionsMember(
    wallet,
    '/cosmos.group.v1.MsgSubmitProposal',
  )

  // fetch metadata for each group policy from network server
  const [withMetadata, withMetadataError] = useGroupPoliciesWithMetadata(
    serverUrl,
    policies,
  )

  // error fetching initial parameters
  const initError =
    policiesError || schemaError || permError || withMetadataError

  // input option
  const [input, setInput] = useState('schema-form')

  // metadata input
  const [json, setJson] = useState<string>('')

  // message inputs
  const [address, setAddress] = useState<string>('')
  const [messages, setMessages] = useState<any[]>([])
  const [execution, setExecution] = useState<string>('')

  // data storage
  const [dataStorage, setDataStorage] = useState<string>('json')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

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

    // set submit proposal message
    const msg: MsgSubmitProposal = {
      $type: 'cosmos.group.v1.MsgSubmitProposal',
      proposers: [wallet.bech32Address],
      groupPolicyAddress: address,
      metadata: metadata,
      messages: messages,
      exec: execFromJSON(execution),
    }

    // convert message to protobuf any message
    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgSubmitProposal',
      value: MsgSubmitProposal.encode(msg).finish(),
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
            label: 'group member',
            hasPermission: isMember,
          },
          {
            label: 'authz grantee',
            hasPermission: isAuthz,
          },
        ]}
      />
      <form className={styles.form} onSubmit={handleSubmit}>
        <SelectAccount
          id="group-account"
          label="group account"
          options={
            withMetadata?.length
              ? withMetadata
              : policies?.map((p: any) => ({ address: p.address }))
          }
          address={address}
          setAddress={setAddress}
        />
        <hr />
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
        <InputMessages
          id="proposal-messages"
          label="proposal messages"
          network={network}
          messages={messages}
          setMessages={setMessages}
        />
        <hr />
        <SelectExecution
          id="proposal-execution"
          label="proposal execution"
          execution={execution}
          setExecution={setExecution}
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

export default SubmitProposal
