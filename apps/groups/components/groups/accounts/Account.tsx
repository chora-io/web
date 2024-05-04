'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import { formatTimestamp } from 'chora/utils'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'
import { GroupContext } from '@contexts/GroupContext'

import styles from './Account.module.css'

const Account = () => {
  const { address } = useParams()

  const { policies, policiesError } = useContext(GroupContext)
  const { chainInfo } = useContext(WalletContext)

  const policy = policies?.find((p: any) => p.address === address)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    policy ? policy.metadata : null,
  )

  const error = policiesError || metadataError

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'name'}</h3>
        <p>{metadata && metadata.name ? metadata.name : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'description'}</h3>
        <p>{metadata && metadata.description ? metadata.description : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'admin'}</h3>
        <p>{policy ? <Address address={policy.admin} /> : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'address'}</h3>
        <p>{policy ? policy.address : 'NA'}</p>
      </div>
      {policy &&
        policy['decision_policy']['@type'] ===
          '/cosmos.group.v1.ThresholdDecisionPolicy' && (
          <div className={styles.boxText}>
            <h3>{'threshold'}</h3>
            <p>{policy['decision_policy']['threshold']}</p>
          </div>
        )}
      {policy &&
        policy['decision_policy']['@type'] ===
          '/cosmos.group.v1.PercentageDecisionPolicy' && (
          <div className={styles.boxText}>
            <h3>{'percentage'}</h3>
            <p>{policy['decision_policy']['percentage']}</p>
          </div>
        )}
      <div className={styles.boxText}>
        <h3>{'voting period'}</h3>
        <p>
          {policy
            ? policy['decision_policy']['windows']['voting_period']
            : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'min execution period'}</h3>
        <p>
          {policy
            ? policy['decision_policy']['windows']['min_execution_period']
            : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'created at'}</h3>
        <p>{policy ? formatTimestamp(policy['created_at']) : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'version'}</h3>
        <p>{policy ? policy.version : 'NA'}</p>
      </div>
      <Result error={error} />
    </div>
  )
}

export default Account
