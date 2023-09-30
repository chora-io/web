import { WalletContext } from 'chora'
import {
  InputString,
  ResultTx,
  SelectAccount,
  SelectMessage,
} from 'chora/components'
import { SelectExecution } from 'chora/components/group'
import { useNetworkServer } from 'chora/hooks'
import { signAndBroadcast } from 'chora/utils'
import { MsgSubmitProposal } from 'cosmos/api/cosmos/group/v1/tx'
import * as jsonld from 'jsonld'
import { useContext, useState } from 'react'

import { useGroupPoliciesWithMetadata } from '@hooks/useGroupPoliciesWithMetadata'

import styles from './SubmitProposal.module.css'

const SubmitProposal = () => {
  const { chainInfo, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch group policies and policies metadata from selected network
  const [policies] = useGroupPoliciesWithMetadata<any[]>([])

  // form input
  const [address, setAddress] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [message, setMessage] = useState<any>(null)
  const [execution, setExecution] = useState<string>('')

  // fetch and form error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // submit proposal
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

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

    let iri: string | null

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
          iri = data['iri']
        }
      })
      .catch((err) => {
        setError(err.message)
      })

    // return error if iri never set
    if (typeof iri === 'null') {
      return
    }

    // set submit proposal message
    const msg = {
      $type: 'cosmos.group.v1.MsgSubmitProposal',
      proposers: [wallet['bech32Address']],
      groupPolicyAddress: address,
      metadata: iri,
      messages: message ? [message] : [],
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <SelectAccount
          id="proposal-policy"
          label="proposal policy"
          options={policies}
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
        <SelectMessage
          id="proposal-message"
          label="proposal message"
          setMessage={setMessage}
        />
        <SelectExecution
          id="proposal-execution"
          label="proposal execution"
          execution={execution}
          setExecution={setExecution}
        />
        <button type="submit">{'submit'}</button>
      </form>
      {(success || error) && (
        <div className={styles.boxResultBelow}>
          <ResultTx error={error} rest={chainInfo?.rest} success={success} />
        </div>
      )}
    </div>
  )
}

export default SubmitProposal
