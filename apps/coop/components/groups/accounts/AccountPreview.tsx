import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import styles from './AccountPreview.module.css'

const AccountPreview = ({ policy }: any) => {
  const { groupId } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch metadata from network server, otherwise resolve
  const [metadata, error] = useMetadata(chainInfo, policy.metadata)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'name'}</h3>
        <p>{metadata && metadata['name'] ? metadata['name'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'address'}</h3>
        <p>{policy['address']}</p>
      </div>
      <Link href={`/groups/${groupId}/accounts/${policy['address']}`}>
        {'view account'}
      </Link>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default AccountPreview
