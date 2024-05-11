'use client'

import { Permissions, ResultTx } from 'chora/components'
import { MetadataInputs } from 'chora/components/forms'
import {
  SelectExecution,
  SelectVote,
} from 'chora/components/forms/cosmos.group.v1'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer, useSchema } from 'chora/hooks'
import { postData, postIpfs, signAndBroadcast } from 'chora/utils'
import { execFromJSON, MsgVote } from 'cosmos/api/cosmos/group/v1/tx'
import { voteOptionFromJSON } from 'cosmos/api/cosmos/group/v1/types'
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

  const [context, example, template, schemaError] = useSchema(contextUrl)

  const [isMember, isAuthz, permError] = usePermissionsMember(
    wallet,
    '/cosmos.group.v1.MsgVote',
  )

  // error fetching initial parameters
  const initError = schemaError || permError

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

    if (!wallet) {
      setError('keplr wallet not found')
      return // do not continue
    }

    if ((dataStorage === 'ipfs' || dataStorage === 'server') && !serverUrl) {
      setError('server url not found')
      return // do not continue
    }

    let metadata: string = ''

    // try to parse JSON
    let parsed: any
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

    // set submit proposal message
    const msg: MsgVote = {
      $type: 'cosmos.group.v1.MsgVote',
      voter: wallet.bech32Address,
      proposalId: Long.fromString(`${id}` || '0'),
      option: voteOptionFromJSON(vote),
      metadata: metadata,
      exec: execFromJSON(execution),
    }

    // convert message to protobuf any message
    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgVote',
      value: MsgVote.encode(msg).finish(),
    }

    // sign and broadcast message to selected network
    await signAndBroadcast(chainInfo, wallet.bech32Address, [msgAny])
      .then((res) => {
        setSuccess(res)
      })
      .catch((err) => {
        setError(err.message)
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
        <SelectVote
          id="vote-option"
          label="vote option"
          vote={vote}
          setVote={setVote}
        />
        <hr />
        <MetadataInputs
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

export default VoteOnProposal
