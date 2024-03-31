import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './GroupsListItem.module.css'

const GroupsListItem = ({ group }: any) => {
  const { chainInfo, wallet } = useContext(WalletContext)

  // fetch metadata from network server, otherwise resolve
  const [metadata, error] = useMetadata(
    chainInfo,
    group ? group.metadata : null,
  )

  // TODO: handle error
  if (error) {
    console.error(error)
  }

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'name'}</h3>
        <p>{metadata && metadata['name'] ? metadata['name'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'description'}</h3>
        <p>
          {metadata && metadata['description'] ? metadata['description'] : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'admin'}</h3>
        <p>
          {group['admin']}
          {wallet && group.admin === wallet.bech32Address && (
            <span className={styles.activeAccount}>{'(active account)'}</span>
          )}
        </p>
      </div>
      <Link href={`/groups/${group.id}`}>{'view group'}</Link>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default GroupsListItem
