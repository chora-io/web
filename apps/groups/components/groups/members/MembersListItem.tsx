import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import styles from './MembersListItem.module.css'

const MembersListItem = ({ member }: any) => {
  const { groupId } = useParams()
  const { chainInfo, network } = useContext(WalletContext)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, error] = useMetadata(chainInfo, member.metadata)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'name'}</h3>
        <p>{metadata && metadata['name'] ? metadata['name'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'address'}</h3>
        <p>{member['address']}</p>
      </div>
      <Link href={`/${network}/${groupId}/members/${member['address']}`}>
        {'view member'}
      </Link>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default MembersListItem
