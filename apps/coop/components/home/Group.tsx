import { WalletContext } from 'chora'
import { Result } from 'chora/components'
import { formatTimestamp } from 'chora/utils'
import { useContext } from 'react'

import Address from '@components/Address'
import { useGroupInfo } from '@hooks/useGroupInfo'

import styles from './Group.module.css'

const Group = () => {
  const { chainInfo } = useContext(WalletContext)

  // fetch group and group metadata from selected network and network server
  const [group, metadata, error] = useGroupInfo(chainInfo)

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
        <p>
          {group && group['admin'] ? <Address address={group.admin} /> : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'created at'}</h3>
        <p>
          {group && group['created_at']
            ? formatTimestamp(group['created_at'])
            : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'version'}</h3>
        <p>{group && group['version'] ? group['version'] : 'NA'}</p>
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
