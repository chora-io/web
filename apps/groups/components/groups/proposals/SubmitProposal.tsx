'use client'

import { MsgSubmitProposal } from 'cosmos/api/cosmos/group/v1/tx'
import { Permissions, ResultTx } from 'chora/components'
import {
  InputJSON,
  InputMessages,
  InputsFromJSON,
  SelectAccount,
  SelectOption,
  SelectStorage,
} from 'chora/components/forms'
import { SelectExecution } from 'chora/components/forms/cosmos.group.v1'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer, useSchema } from 'chora/hooks'
import { postToServer, signAndBroadcast } from 'chora/utils'
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

    let metadata: string = ''

    // try to parse JSON
    let parsed: any
    try {
      parsed = JSON.parse(json)
    } catch (err) {
      setError('invalid json')
    }

    // handle data storage json
    if (dataStorage === 'json') {
      delete parsed['@context']
      metadata = parsed
    }

    // handle data storage iri
    if (dataStorage === 'server' && serverUrl) {
      await postToServer(parsed, network, serverUrl)
        .then((res) => {
          metadata = res
        })
        .catch((err) => {
          setError(err)
        })
    }

    // set submit proposal message
    const msg = {
      $type: 'cosmos.group.v1.MsgSubmitProposal',
      proposers: [wallet.bech32Address],
      groupPolicyAddress: address,
      metadata: metadata,
      messages: messages,
      exec: execution,
    } as unknown as MsgSubmitProposal

    // convert message to any message
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
        <SelectOption
          id="metadata-input"
          label="metadata input"
          options={[
            { id: 'schema-form', label: 'schema form' },
            { id: 'custom-json', label: 'custom json' },
          ]}
          setSelected={setInput}
        />
        {input === 'schema-form' && (
          <InputsFromJSON example={example} json={json} setJson={setJson} />
        )}
        {input === 'custom-json' && (
          <InputJSON
            json={json}
            placeholder={example}
            setJson={setJson}
            useTemplate={handleUseTemplate}
            showUseTemplate={context && context.length > 0}
          />
        )}
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
        <SelectStorage
          network={network}
          dataStorage={dataStorage}
          setDataStorage={setDataStorage}
        />
        <button type="submit">{'submit'}</button>
      </form>
      <div className={styles.boxText}>
        <ResultTx
          error={error || initError}
          rest={chainInfo?.rest}
          success={success}
        />
      </div>
    </div>
  )
}

export default SubmitProposal
