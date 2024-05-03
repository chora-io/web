'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import { formatTimestamp } from 'chora/utils'
import { useContext } from 'react'

import Address from '@components/Address'
import { GroupContext } from '@contexts/GroupContext'

import styles from './Group.module.css'

const Group = () => {
  const { group, groupError } = useContext(GroupContext)
  const { chainInfo } = useContext(WalletContext)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    group ? group.metadata : null,
  )

  const error = groupError || metadataError

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
        <p>{group ? <Address address={group.admin} /> : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'created at'}</h3>
        <p>{group ? formatTimestamp(group['created_at']) : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'version'}</h3>
        <p>{group ? group.version : 'NA'}</p>
      </div>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Group
