import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './GeonodesTableRow.module.css'

const GeonodesTableRow = ({ node }: any) => {
  const { chainInfo, wallet } = useContext(WalletContext)

  // fetch node metadata by iri from network server
  const [metadata, error] = useMetadata(chainInfo, node.metadata)

  // TODO: handle error
  if (error) {
    console.error(error)
  }

  return (
    <tr>
      <td>{node.id}</td>
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
        {node.curator.substring(0, 13) + '...' + node.curator.substring(38, 44)}
        {wallet && node.curator === wallet.bech32Address && (
          <span className={styles.activeAccount}>{'(active account)'}</span>
        )}
      </td>
      <td style={{ minWidth: '120px' }}>
        <Link href={`/geonodes/${node.id}`}>{'view node'}</Link>
      </td>
    </tr>
  )
}

export default GeonodesTableRow
