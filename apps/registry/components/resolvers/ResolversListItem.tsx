import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './ResolversListItem.module.css'

const ResolversListItem = ({ resolver }: any) => {
  const { network, wallet } = useContext(WalletContext)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'url'}</h3>
        <p>{resolver && resolver['url'] ? resolver['url'] : 'NA'}</p>
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
    </div>
  )
}

export default ResolversListItem
