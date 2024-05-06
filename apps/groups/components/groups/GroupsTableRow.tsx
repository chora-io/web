import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import { subAddress } from 'chora/utils'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './GroupsTableRow.module.css'

const GroupsTableRow = ({ group }: any) => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    group ? group.metadata : null,
  )

  // TODO: handle error
  if (metadataError) {
    console.error(metadataError)
  }

  return (
    <tr>
      <td>{group.id}</td>
      <td>
        {metadata && metadata.name
          ? metadata.name.substring(0, 25) +
            (metadata.name.length > 25 ? '...' : '')
          : 'NA'}
      </td>
      <td>
        {metadata && metadata.description
          ? metadata.description.substring(0, 50) +
            (metadata.description.length > 50 ? '...' : '')
          : 'NA'}
      </td>
      <td>
        {subAddress(group.admin)}
        {wallet && group.admin === wallet.bech32Address && (
          <span className={styles.activeAccount}>{'(active account)'}</span>
        )}
      </td>
      <td style={{ minWidth: '120px' }}>
        <Link href={`/${network}/${group.id}`}>{'view group'}</Link>
      </td>
    </tr>
  )
}

export default GroupsTableRow
