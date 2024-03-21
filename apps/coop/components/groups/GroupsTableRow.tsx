import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import { useGroupMetadata } from '@hooks/useGroupMetadata'

import styles from './GroupsTableRow.module.css'

const GroupsTableRow = ({ group }: any) => {
  const { chainInfo, wallet } = useContext(WalletContext)

  // fetch group metadata by iri from network server
  const [metadata, error] = useGroupMetadata(chainInfo, group)

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
          <span style={{ fontWeight: '400', marginLeft: '5px' }}>
            {'(active account)'}
          </span>
        )}
      </td>
      <td style={{ minWidth: '120px' }}>
        <Link className={styles.button} href={`/groups/${group.id}`}>
          {'view group'}
        </Link>
      </td>
    </tr>
  )
}

export default GroupsTableRow
