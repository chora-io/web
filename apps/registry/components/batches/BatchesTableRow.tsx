import { WalletContext } from 'chora/contexts'
import { formatTimestamp } from 'chora/utils'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './BatchesTableRow.module.css'

const BatchesTableRow = ({ batch }: any) => {
  const { network, wallet } = useContext(WalletContext)

  return (
    <tr>
      <td>{batch.denom}</td>
      <td>{formatTimestamp(batch['issuance_date'])}</td>
      <td>
        {batch.issuer.substring(0, 13) + '...' + batch.issuer.substring(38, 44)}
        {wallet && batch.issuer === wallet.bech32Address && (
          <span className={styles.activeAccount}>{'(active account)'}</span>
        )}
      </td>
      <td style={{ minWidth: '120px' }}>
        <Link href={`/${network}/batches/${batch.denom}`}>{'view batch'}</Link>
      </td>
    </tr>
  )
}

export default BatchesTableRow
