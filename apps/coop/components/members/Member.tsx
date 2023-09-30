import { WalletContext } from 'chora'
import { Result } from 'chora/components'
import { formatTimestamp } from 'chora/utils'
import { useContext } from 'react'

import { useGroupMember } from '@hooks/useGroupMember'

import styles from './Member.module.css'

const Member = ({ address }: { address: string }) => {
  const { chainInfo } = useContext(WalletContext)

  // fetch member and member metadata from selected network and network server
  const [member, metadata, error] = useGroupMember(chainInfo, address)

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
