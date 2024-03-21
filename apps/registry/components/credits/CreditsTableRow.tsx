import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './CreditsTableRow.module.css'

const CreditsTableRow = ({ batch }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <tr>
      <td>{batch.denom}</td>
      <td>{batch['issuance_date']}</td>
      <td>
        {batch.issuer.substring(0, 13) + '...' + batch.issuer.substring(38, 44)}
        {wallet && batch.issuer === wallet.bech32Address && (
          <span className={styles.activeAccount}>{'(active account)'}</span>
        )}
      </td>
      <td style={{ minWidth: '120px' }}>
        <Link href={`/credits/${batch.denom}`}>{'view batch'}</Link>
      </td>
    </tr>
  )
}

export default CreditsTableRow
