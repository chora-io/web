import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './GroupsTableRow.module.css'

const GroupsTableRow = ({ group }: any) => {
  const { chainInfo, wallet } = useContext(WalletContext)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, error] = useMetadata(
    chainInfo,
    group ? group.metadata : null,
  )

  // TODO: handle error
  if (error) {
    console.error(error)
  }

  return (
    <tr>
      <td>{group.id}</td>
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
        {group.admin.substring(0, 13) + '...' + group.admin.substring(38, 44)}
        {wallet && group.admin === wallet.bech32Address && (
          <span className={styles.activeAccount}>{'(active account)'}</span>
        )}
      </td>
      <td style={{ minWidth: '120px' }}>
        <Link href={`/groups/${group.id}`}>{'view group'}</Link>
      </td>
    </tr>
  )
}

export default GroupsTableRow
