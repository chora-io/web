import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './BasketsTableRow.module.css'

const BasketsTableRow = ({ basket }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <tr>
      <td>{basket.denom}</td>
      <td>
        {basket.curator.substring(0, 13) +
          '...' +
          basket.curator.substring(38, 44)}
        {wallet && basket.curator === wallet.bech32Address && (
          <span className={styles.activeAccount}>{'(active account)'}</span>
        )}
      </td>
      <td style={{ minWidth: '120px' }}>
        <Link href={`/baskets/${basket.denom}`}>{'view basket'}</Link>
      </td>
    </tr>
  )
}

export default BasketsTableRow
