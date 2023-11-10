'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { formatTimestamp } from 'chora/utils'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'
import { useGroupPolicy } from '@hooks/useGroupPolicy'

import styles from './Policy.module.css'

const Policy = () => {
  const { address } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch policy and policy metadata from selected network and network server
  const [policy, metadata, error] = useGroupPolicy(chainInfo, `${address}`)

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'name'}</h3>
        <p>{metadata && metadata['name'] ? metadata['name'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'description'}</h3>
        <p>
          {metadata && metadata['description'] ? metadata['description'] : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'admin'}</h3>
        <p>{policy?.admin ? <Address address={policy.admin} /> : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'address'}</h3>
        <p>{policy && policy['address'] ? policy['address'] : 'NA'}</p>
      </div>
      {policy &&
        policy['decision_policy'] &&
        policy['decision_policy']['@type'] ===
          '/cosmos.group.v1.ThresholdDecisionPolicy' && (
          <div className={styles.boxText}>
            <h3>{'threshold'}</h3>
            <p>{policy['decision_policy']['threshold']}</p>
          </div>
        )}
      {policy &&
        policy['decision_policy'] &&
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
          {policy && policy['decision_policy']
            ? policy['decision_policy']['windows']['voting_period']
            : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'min execution period'}</h3>
        <p>
          {policy && policy['decision_policy']
            ? policy['decision_policy']['windows']['min_execution_period']
            : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'created at'}</h3>
        <p>
          {policy && policy['created_at']
            ? formatTimestamp(policy['created_at'])
            : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'version'}</h3>
        <p>{policy && policy['version'] ? policy['version'] : 'NA'}</p>
      </div>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Policy
