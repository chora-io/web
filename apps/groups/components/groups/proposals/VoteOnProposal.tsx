'use client'

import { MsgVote } from 'cosmos/api/cosmos/group/v1/tx'
import { ResultTx } from 'chora/components'
import {
  InputJSON,
  InputsFromJSON,
  SelectOption,
  SelectStorage,
} from 'chora/components/forms'
import {
  SelectExecution,
  SelectVote,
} from 'chora/components/forms/cosmos.group.v1'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer, useSchema } from 'chora/hooks'
import { postToServer, signAndBroadcast } from 'chora/utils'
import * as Long from 'long'
import { useParams } from 'next/navigation'
import { useContext, useState } from 'react'

import { usePermissionsMember } from '@hooks/usePermissionsMember'

import styles from './VoteOnProposal.module.css'

const contextUrl = 'https://schema.chora.io/contexts/group_vote.jsonld'

const VoteOnProposal = () => {
  const { id } = useParams()
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)
  const [context, example, template] = useSchema(contextUrl)

  const [isMember, isAuthz] = usePermissionsMember(
    wallet,
    '/cosmos.group.v1.MsgVote',
  )

  // input option
  const [input, setInput] = useState('schema-form')

  // metadata input
  const [json, setJson] = useState<string>('')

  // message inputs
  const [vote, setVote] = useState<string>('')
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
      $type: 'cosmos.group.v1.MsgVote',
      voter: wallet.bech32Address,
      proposalId: Long.fromString(`${id}`),
      option: vote,
      metadata: metadata,
      exec: execution,
    } as unknown as MsgVote

    // convert message to any message
    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgVote',
      value: MsgVote.encode(msg).finish(),
    }

    // sign and broadcast message to selected network
    await signAndBroadcast(chainInfo, wallet['bech32Address'], [msgAny])
      .then((res) => {
        setSuccess(res)
      })
      .catch((err) => {
        setError(err.message)
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
        <SelectVote
          id="vote-option"
          label="vote option"
          vote={vote}
          setVote={setVote}
        />
        <hr />
        <SelectOption
          id="metadata"
          label="metadata"
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
            useTemplate={() => setJson(template)}
            showUseTemplate={context.length > 0}
          />
        )}
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
        <ResultTx error={error} rest={chainInfo?.rest} success={success} />
      </div>
    </div>
  )
}

export default VoteOnProposal
