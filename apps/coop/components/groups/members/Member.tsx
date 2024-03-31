'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import { formatTimestamp } from 'chora/utils'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useGroupMember } from '@hooks/useGroupMember'

import styles from './Member.module.css'

const Member = () => {
  const { address, groupId } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch member from selected network
  const [member, memberError] = useGroupMember(chainInfo, groupId, `${address}`)

  // fetch metadata from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    member ? member.metadata : null,
  )

  const error = memberError || metadataError

  return (
    <div className={styles.box}>
      <div>
        <div className={styles.boxText}>
          <h3>{'name'}</h3>
          <p>{metadata && metadata['name'] ? metadata['name'] : 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'address'}</h3>
          <p>{member && member['address'] ? member['address'] : 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'added at'}</h3>
          <p>
            {member && member['added_at']
              ? formatTimestamp(member['added_at'])
              : 'NA'}
          </p>
        </div>
        <div className={styles.boxText}>
          <h3>{'weight'}</h3>
          <p>{member && member['weight'] ? member['weight'] : 'NA'}</p>
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
