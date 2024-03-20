import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import { useGroupMetadata } from '@hooks/useGroupMetadata'

import styles from './GroupPreview.module.css'

const GroupPreview = ({ group }: any) => {
  const { chainInfo } = useContext(WalletContext)

  // fetch group metadata by iri from network server
  const [metadata, error] = useGroupMetadata(chainInfo, group)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'name'}</h3>
        <p>{metadata && metadata['name'] ? metadata['name'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'admin'}</h3>
        <p>{group?.admin ? group.admin : 'NA'}</p>
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

export default GroupPreview
