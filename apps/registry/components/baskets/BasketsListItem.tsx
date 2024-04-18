import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './BasketsListItem.module.css'

const BasketsListItem = ({ basket }: any) => {
  const { network, wallet } = useContext(WalletContext)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'denom'}</h3>
        <p>{basket.denom}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'curator'}</h3>
        <p>
          {basket.curator}
          {wallet && basket.curator === wallet.bech32Address && (
            <span className={styles.activeAccount}>{'(active account)'}</span>
          )}
        </p>
      </div>
      <Link href={`/${network}/baskets/${basket.denom}`}>{'view basket'}</Link>
    </div>
  )
}

export default BasketsListItem
