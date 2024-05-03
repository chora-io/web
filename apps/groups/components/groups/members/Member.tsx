'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import { formatTimestamp } from 'chora/utils'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { GroupContext } from '@contexts/GroupContext'

import styles from './Member.module.css'

const Member = () => {
  const { address } = useParams()

  const { members, membersError } = useContext(GroupContext)
  const { chainInfo } = useContext(WalletContext)

  // fetch member from selected network
  const member = members?.find((m: any) => m.member.address === address).member

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    member ? member.metadata : null,
  )

  const error = membersError || metadataError

  return (
    <div className={styles.box}>
      <div>
        <div className={styles.boxText}>
          <h3>{'name'}</h3>
          <p>{metadata && metadata.name ? metadata.name : 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'address'}</h3>
          <p>{member ? member.address : 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'added at'}</h3>
          <p>{member ? formatTimestamp(member['added_at']) : 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'weight'}</h3>
          <p>{member ? member.weight : 'NA'}</p>
        </div>
      </div>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Member
