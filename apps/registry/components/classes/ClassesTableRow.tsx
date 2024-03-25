import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './ClassesTableRow.module.css'

const ClassesTableRow = ({ clazz }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <tr>
      <td>{clazz.id}</td>
      <td>{clazz['credit_type_abbrev']}</td>
      <td>
        {clazz.admin.substring(0, 13) + '...' + clazz.admin.substring(38, 44)}
        {wallet && clazz.admin === wallet.bech32Address && (
          <span className={styles.activeAccount}>{'(active account)'}</span>
        )}
      </td>
      <td style={{ minWidth: '120px' }}>
        <Link href={`/classes/${clazz.id}`}>{'view class'}</Link>
      </td>
    </tr>
  )
}

export default ClassesTableRow
