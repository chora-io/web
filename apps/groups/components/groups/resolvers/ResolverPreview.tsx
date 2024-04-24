import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

import styles from './ResolverPreview.module.css'

const ResolverPreview = ({ resolver }: any) => {
  const { groupId } = useParams()
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'id'}</h3>
        <p>{resolver['id']}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'url'}</h3>
        <p>{resolver['url']}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'manager'}</h3>
        <p>
          {resolver['manager'] ? (
            <Address address={resolver['manager']} />
          ) : (
            'NA'
          )}
        </p>
      </div>
      <Link href={`/${network}/${groupId}/resolvers/${resolver['id']}`}>
        {'view resolver'}
      </Link>
    </div>
  )
}

export default ResolverPreview
