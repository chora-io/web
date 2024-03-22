import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './CreditsListItem.module.css'

const CreditsListItem = ({ batch }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'denom'}</h3>
        <p>{batch.denom}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'issuance date'}</h3>
        <p>{batch['issuance_date']}</p>
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
      <Link href={`/credits/${batch.denom}`}>{'view batch'}</Link>
    </div>
  )
}

export default CreditsListItem
