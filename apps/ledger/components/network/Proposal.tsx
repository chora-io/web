'use client'

import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import { getMarkdown, formatTimestamp } from 'chora/utils'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

import styles from './Proposal.module.css'

const queryProposal = '/cosmos/gov/v1/proposals'

const Proposal = () => {
  const { id } = useParams()

  const { chainInfo } = useContext(WalletContext)

  const [proposal, setProposal] = useState<any>(null)
  const [summary, setSummary] = useState<string | null>(null)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    proposal ? proposal.metadata : null,
  )

  useEffect(() => {
    if (!proposal && chainInfo?.rest) {
      fetch(chainInfo.rest + queryProposal + '/' + id)
        .then((res) => res.json())
        .then((data) => setProposal(data.proposal))
        .catch((err) => {
          console.error(err.message)
        })
    }
  }, [chainInfo?.rest, proposal])

  const convertSummary = () =>
    getMarkdown(metadata.summary)
      .then((data) => setSummary(data))
      .catch((e) => console.error(e))

  useEffect(() => {
    if (metadata && metadata.summary && !summary) {
      convertSummary()
    }
  }, [metadata, summary])

  return proposal ? (
    <>
      <div className={styles.box}>
        <div className={styles.boxText}>
          <h3>{'id'}</h3>
          <p>{(proposal && proposal.id) || 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'status'}</h3>
          <p>{(proposal && proposal.status) || 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'name'}</h3>
          <p>
            {metadata
              ? metadata.name || metadata.title
              : proposal &&
                  proposal.messages.length &&
                  proposal.messages[0].content
                ? proposal.messages[0].content.title
                : 'NA'}
          </p>
        </div>
        <div className={styles.boxText}>
          <h3>{'description'}</h3>
          {summary ? (
            <div
              className={styles.summary}
              dangerouslySetInnerHTML={{ __html: summary }}
            />
          ) : (
            <p>
              {metadata
                ? metadata.description || metadata.summary
                : proposal &&
                    proposal.messages.length &&
                    proposal.messages[0].content
                  ? proposal.messages[0].content.description
                  : 'NA'}
            </p>
          )}
        </div>
        <div className={styles.boxText}>
          <h3>{'messages'}</h3>
          {(!proposal || (proposal && !proposal.messages.length)) && (
            <p>{'NA'}</p>
          )}
          {proposal && proposal.messages.length && (
            <pre>
              <p>{JSON.stringify(proposal.messages, null, ' ')}</p>
            </pre>
          )}
        </div>
        {!!proposal && proposal['total_deposit'].length ? (
          proposal['total_deposit'].map((d: any, i: number) => (
            <div key={i} className={styles.boxText}>
              <h3>{'total deposit'}</h3>
              <p>{d.amount + d.denom}</p>
            </div>
          ))
        ) : (
          <div className={styles.boxText}>
            <p>{'no deposit found'}</p>
          </div>
        )}
        <div className={styles.boxText}>
          <h3>{'submit time'}</h3>
          <p>
            {(proposal && formatTimestamp(proposal['submit_time'])) || 'NA'}
          </p>
        </div>
        <div className={styles.boxText}>
          <h3>{'deposit end time'}</h3>
          <p>
            {(proposal && formatTimestamp(proposal['deposit_end_time'])) ||
              'NA'}
          </p>
        </div>
        <div className={styles.boxText}>
          <h3>{'voting start time'}</h3>
          <p>
            {(proposal && formatTimestamp(proposal['voting_start_time'])) ||
              'NA'}
          </p>
        </div>
        <div className={styles.boxText}>
          <h3>{'voting end time'}</h3>
          <p>
            {(proposal && formatTimestamp(proposal['voting_end_time'])) || 'NA'}
          </p>
        </div>
        <div className={styles.boxText}>
          <h3>{'final tally result (yes)'}</h3>
          <p>
            {(proposal &&
              proposal['final_tally_result'] &&
              proposal['final_tally_result']['yes_count']) ||
              'NA'}
          </p>
        </div>
        <div className={styles.boxText}>
          <h3>{'final tally result (no)'}</h3>
          <p>
            {(proposal &&
              proposal['final_tally_result'] &&
              proposal['final_tally_result']['no_count']) ||
              'NA'}
          </p>
        </div>
        <div className={styles.boxText}>
          <h3>{'final tally result (no with veto)'}</h3>
          <p>
            {(proposal &&
              proposal['final_tally_result'] &&
              proposal['final_tally_result']['no_with_veto_count']) ||
              'NA'}
          </p>
        </div>
        <div className={styles.boxText}>
          <h3>{'final tally result (abstain)'}</h3>
          <p>
            {(proposal &&
              proposal['final_tally_result'] &&
              proposal['final_tally_result']['abstain_count']) ||
              'NA'}
          </p>
        </div>
      </div>
    </>
  ) : (
    <></>
  )
}

export default Proposal
