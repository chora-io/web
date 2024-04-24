import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

import styles from './ClaimPreview.module.css'

const ClaimPreview = ({ claim }: any) => {
  const { groupId } = useParams()
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'iri'}</h3>
        <p>{claim['iri'] || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'timestamp'}</h3>
        <p>{claim['timestamp'] || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'attestor'}</h3>
        <p>
          {claim['attestor'] ? <Address address={claim['attestor']} /> : 'NA'}
        </p>
      </div>
      <Link href={`/${network}/${groupId}/claims/${claim['iri']}`}>
        {'view claim'}
      </Link>
    </div>
  )
}

export default ClaimPreview
