'use client'

import { Result, ResultTx } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import { formatTimestamp, signAndBroadcast } from 'chora/utils'
import { MsgExec } from 'cosmos/api/cosmos/group/v1/tx'
import * as Long from 'long'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

import Address from '@components/Address'
import { useGroupProposal } from '@hooks/useGroupProposal'
import { useGroupProposalVotes } from '@hooks/useGroupProposalVotes'

import styles from './Proposal.module.css'

// TODO(cosmos-sdk): voter should be able to update vote

const Proposal = () => {
  const { id, groupId } = useParams()

  const { chainInfo, network, wallet } = useContext(WalletContext)

  // fetch proposal from selected network or indexer service
  const [proposal, proposalError] = useGroupProposal(chainInfo, `${id}`)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    proposal ? proposal.metadata : null,
  )

  // fetch group proposal votes from selected network (to determine available actions)
  const [votes, votesError] = useGroupProposalVotes(chainInfo, `${id}`)

  const error = proposalError || metadataError || votesError

  // execution error and results
  const [execError, setExecError] = useState<string | null>(null)
  const [execSuccess, setExecSuccess] = useState<any>(null)

  // reset state on network or proposal id change
  useEffect(() => {
    setExecError(null)
    setExecSuccess(null)
  }, [chainInfo?.chainId, id])

  // execute proposal
  const handleExecute = async () => {
    const msg = {
      executor: wallet.bech32Address,
      proposalId: Long.fromString(`${id}`),
    } as unknown as MsgExec

    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgExec',
      value: MsgExec.encode(msg).finish(),
    }

    await signAndBroadcast(chainInfo, wallet.bech32Address, [msgAny])
      .then((res) => {
        setExecSuccess(res)
      })
      .catch((err) => {
        setExecError(err.message)
      })
  }

  // whether votes have been finalized
  const votesFinalized =
    proposal &&
    (proposal.status === 'PROPOSAL_STATUS_ACCEPTED' ||
      proposal.status === 'PROPOSAL_STATUS_REJECTED')

  // current vote of active user
  const currentVote = votes?.find(
    (vote: any) => vote.voter === wallet.bech32Address,
  )

  // whether proposal is executable
  const proposalExecutable =
    proposal &&
    proposal.status === 'PROPOSAL_STATUS_ACCEPTED' &&
    (proposal['executor_result'] === 'PROPOSAL_EXECUTOR_RESULT_NOT_RUN' ||
      proposal['executor_result'] === 'PROPOSAL_EXECUTOR_RESULT_FAILURE')

  return (
    <div className={styles.box}>
      <div className={styles.boxOptions}>
        {proposal && votesFinalized && !proposalExecutable && (
          <p>{'no further action can be taken'}</p>
        )}
        {proposal && currentVote && (
          <p>{`vote submitted (${currentVote['option']})`}</p>
        )}
        {proposal && !currentVote && !votesFinalized && (
          <Link href={`/${network}/${groupId}/proposals/${id}/submit`}>
            {'submit vote'}
          </Link>
        )}
        {proposal && proposalExecutable && (
          <button onClick={handleExecute}>{'execute proposal'}</button>
        )}
        {!proposal && !error && <p>{'loading...'}</p>}
        {!proposal && error && <Result error={error} />}
      </div>
      {(execSuccess || execError) && (
        <div className={styles.boxResultAbove}>
          <ResultTx
            error={execError}
            rest={chainInfo.rest}
            success={execSuccess}
          />
        </div>
      )}
      <div className={styles.boxText}>
        <h3>{'status'}</h3>
        <p>{proposal ? proposal.status : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'name'}</h3>
        <p>{metadata && metadata.name ? metadata.name : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'description'}</h3>
        <p>{metadata && metadata.description ? metadata.description : 'NA'}</p>
      </div>
      {proposal && (
        <div className={styles.boxText}>
          <h3>{proposal.proposers.length > 1 ? 'proposers' : 'proposer'}</h3>
          {proposal.proposers.map((proposer: string) => (
            <p key={proposer}>
              <Address address={proposer} />
            </p>
          ))}
        </div>
      )}
      <div className={styles.boxText}>
        <h3>{'group account address'}</h3>
        <p>
          {proposal ? (
            <Address address={proposal['group_policy_address']} />
          ) : (
            'NA'
          )}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'submit time'}</h3>
        <p>{proposal ? formatTimestamp(proposal['submit_time']) : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'voting period end'}</h3>
        <p>
          {proposal ? formatTimestamp(proposal['voting_period_end']) : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'messages'}</h3>
        {(!proposal || (proposal && proposal.messages.length === 0)) && (
          <p>{'NA'}</p>
        )}
        {proposal && proposal.messages.length > 0 && (
          <pre>
            <p>{JSON.stringify(proposal.messages, null, ' ')}</p>
          </pre>
        )}
      </div>
      {proposal && votesFinalized && (
        <div>
          <div className={styles.boxText}>
            <h3>{'final tally yes'}</h3>
            <p>{proposal['final_tally_result']['yes_count']}</p>
          </div>
          <div className={styles.boxText}>
            <h3>{'final tally abstain'}</h3>
            <p>{proposal['final_tally_result']['abstain_count']}</p>
          </div>
          <div className={styles.boxText}>
            <h3>{'final tally no'}</h3>
            <p>{proposal['final_tally_result']['no_count']}</p>
          </div>
          <div className={styles.boxText}>
            <h3>{'final tally no with veto'}</h3>
            <p>{proposal['final_tally_result']['no_with_veto_count']}</p>
          </div>
          <div className={styles.boxText}>
            <h3>{'executor result'}</h3>
            <p>{proposal['executor_result']}</p>
          </div>
        </div>
      )}
      <div className={styles.boxText}>
        <h3>{'group version'}</h3>
        <p>{proposal ? proposal['group_version'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'group account version'}</h3>
        <p>{proposal ? proposal['group_policy_version'] : 'NA'}</p>
      </div>
    </div>
  )
}

export default Proposal
