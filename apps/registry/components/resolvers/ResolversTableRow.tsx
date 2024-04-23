import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './ResolversTableRow.module.css'

const ResolversTableRow = ({ resolver }: any) => {
  const { network, wallet } = useContext(WalletContext)

  return (
    <tr>
      <td>{resolver.id}</td>
      <td>{resolver.url}</td>
      <td>
        {resolver.manager.substring(0, 13) +
          '...' +
          resolver.manager.substring(38, 44)}
        {wallet && resolver.manager === wallet.bech32Address && (
          <span className={styles.activeAccount}>{'(active account)'}</span>
        )}
      </td>
      <td style={{ minWidth: '120px' }}>
        <Link href={`/${network}/resolvers/${resolver.id}`}>
          {'view resolver'}
        </Link>
      </td>
    </tr>
  )
}

export default ResolversTableRow
