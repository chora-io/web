'use client'

import { ResultTx } from 'chora/components'
import {
  InputString,
  SelectAccount,
  InputMessages,
  SelectMetadataFormat,
} from 'chora/components/forms'
import { SelectExecution } from 'chora/components/forms/cosmos.group.v1'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer } from 'chora/hooks'
import { signAndBroadcast } from 'chora/utils'
import { MsgSubmitProposal } from 'cosmos/api/cosmos/group/v1/tx'
import * as jsonld from 'jsonld'
import { useContext, useState } from 'react'

import { GroupContext } from '@contexts/GroupContext'
import { usePermissionsMember } from '@hooks/usePermissionsMember'
import { useGroupPoliciesWithMetadata } from '@hooks/useGroupPoliciesWithMetadata'

import styles from './SubmitProposal.module.css'

const SubmitProposal = () => {
  const { policies, policiesError } = useContext(GroupContext)
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  const [isMember, isAuthz] = usePermissionsMember(
    wallet,
    '/cosmos.group.v1.MsgSubmitProposal',
  )

  // fetch metadata for each group policy from network server
  const [withMetadata, withMetadataError] = useGroupPoliciesWithMetadata(
    serverUrl,
    policies,
  )

  // form inputs
  const [address, setAddress] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [messages, setMessages] = useState<any[]>([])
  const [execution, setExecution] = useState<string>('')

  // metadata format
  const [metadataFormat, setMetadataFormat] = useState<string>('json')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    let metadata: string = ''

    // handle metadata format json
    if (metadataFormat === 'json') {
      metadata = JSON.stringify({
        name: name,
        description: description,
      })
    }

    // handle metadata format iri
    if (metadataFormat === 'iri') {
      // set JSON-LD document
      const doc = {
        '@context': 'https://schema.chora.io/contexts/group_proposal.jsonld',
        name: name,
        description: description,
      }

      // check and normalize JSON-LD document
      const normalized = await jsonld
        .normalize(doc, {
          algorithm: 'URDNA2015',
          format: 'application/n-quads',
        })
        .catch((err) => {
          setError(err.message)
          return
        })

      // return error if empty
      if (normalized == '') {
        setError('JSON-LD empty after normalized')
        return
      }

      // set post request body
      const body = {
        canon: 'URDNA2015',
        context: 'https://schema.chora.io/contexts/group_proposal.jsonld',
        digest: 'BLAKE2B_256',
        jsonld: JSON.stringify(doc),
        merkle: 'UNSPECIFIED',
      }

      let iri: string | undefined

      // post data to network server
      await fetch(serverUrl + '/data', {
        method: 'POST',
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code) {
            setError(data.message)
          } else {
            iri = network.includes('chora')
              ? data['iri']
              : network.split('-')[0] + ':' + data['iri'].split(':')[1]
          }
        })
        .catch((err) => {
          setError(err.message)
        })

      // return error if iri never set
      if (typeof iri === 'undefined') {
        return
      }

      metadata = iri
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
    await signAndBroadcast(chainInfo, wallet['bech32Address'], [msgAny])
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

  return (
    <div className={styles.box}>
      <div className={styles.boxOptions}>
        <span style={{ fontSize: '0.9em', marginRight: '1.5em', opacity: 0.5 }}>
          <b>{isMember ? '✓' : 'x'}</b>
          <span style={{ marginLeft: '0.5em' }}>{'group member'}</span>
        </span>
        <span style={{ fontSize: '0.9em', marginRight: '1.5em', opacity: 0.5 }}>
          <b>{isAuthz ? '✓' : 'x'}</b>
          <span style={{ marginLeft: '0.5em' }}>{'authz grantee'}</span>
        </span>
      </div>
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
        <InputString
          id="proposal-name"
          label="proposal name"
          placeholder="New Proposal"
          string={name}
          setString={setName}
        />
        <InputString
          id="proposal-description"
          label="proposal description"
          placeholder="A proposal for group members to vote on."
          string={description}
          setString={setDescription}
        />
        <InputMessages
          id="proposal-messages"
          label="proposal messages"
          network={network}
          messages={messages}
          setMessages={setMessages}
        />
        <SelectExecution
          id="proposal-execution"
          label="proposal execution"
          execution={execution}
          setExecution={setExecution}
        />
        <hr />
        <SelectMetadataFormat
          network={network}
          metadataFormat={metadataFormat}
          setMetadataFormat={setMetadataFormat}
        />
        <button type="submit">{'submit'}</button>
      </form>
      <div className={styles.boxText}>
        <ResultTx
          error={policiesError || withMetadataError || error}
          rest={chainInfo?.rest}
          success={success}
        />
      </div>
    </div>
  )
}

export default SubmitProposal
