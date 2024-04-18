import { WalletContext } from 'chora/contexts'
import { formatTimestamp } from 'chora/utils'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './BatchesListItem.module.css'

const BatchesListItem = ({ batch }: any) => {
  const { network, wallet } = useContext(WalletContext)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'denom'}</h3>
        <p>{batch.denom}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'issuance date'}</h3>
        <p>{formatTimestamp(batch['issuance_date'])}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'issuer'}</h3>
        <p>
          {batch.issuer}
          {wallet && batch.issuer === wallet.bech32Address && (
            <span className={styles.activeAccount}>{'(active account)'}</span>
          )}
        </p>
      </div>
      <Link href={`/${network}/batches/${batch.denom}`}>{'view batch'}</Link>
    </div>
  )
}

export default BatchesListItem
