import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import { useGroupPolicyMetadata } from '@hooks/useGroupPolicyMetadata'

import styles from './AccountPreview.module.css'

const AccountPreview = ({ policy }: any) => {
  const { chainInfo } = useContext(WalletContext)

  // fetch policy metadata by iri from network server
  const [metadata, error] = useGroupPolicyMetadata(chainInfo, policy.metadata)

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
      <Link href={`/group/account/${policy['address']}`}>{'view account'}</Link>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default AccountPreview
