import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './ResolversListItem.module.css'

const ResolversListItem = ({ resolver }: any) => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  // TODO(regen-ledger): add resolver metadata field and update message
  const tmpMetadata = `{"name":"resolver ${resolver.id}"`

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, error] = useMetadata(chainInfo, tmpMetadata)

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
        <h3>{'manager'}</h3>
        <p>
          {resolver.manager}
          {wallet && resolver.manager === wallet.bech32Address && (
            <span className={styles.activeAccount}>{'(active account)'}</span>
          )}
        </p>
      </div>
      <Link href={`/${network}/resolvers/${resolver.id}`}>
        {'view resolver'}
      </Link>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default ResolversListItem
