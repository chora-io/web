import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './HabitatsTableRow.module.css'

const HabitatsTableRow = ({ habitat }: any) => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, error] = useMetadata(chainInfo, habitat.metadata)

  // TODO: handle error
  if (error) {
    console.error(error)
  }

  return (
    <tr>
      <td>{habitat.id}</td>
      <td>
        {metadata && metadata['name']
          ? metadata['name'].substring(0, 25) +
            (metadata['name'].length > 25 ? '...' : '')
          : 'NA'}
      </td>
      <td>
        {metadata && metadata['description']
          ? metadata['description'].substring(0, 50) +
            (metadata['description'].length > 50 ? '...' : '')
          : 'NA'}
      </td>
      <td>
        {habitat.steward.substring(0, 13) +
          '...' +
          habitat.steward.substring(38, 44)}
        {wallet && habitat.steward === wallet.bech32Address && (
          <span className={styles.activeAccount}>{'(active account)'}</span>
        )}
      </td>
      <td style={{ minWidth: '120px' }}>
        <Link href={`/${network}/habitats/${habitat.id}`}>
          {'view habitat'}
        </Link>
      </td>
    </tr>
  )
}

export default HabitatsTableRow
