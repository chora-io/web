import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './ClassesListItem.module.css'

const ClassesListItem = ({ clazz }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'id'}</h3>
        <p>{clazz.id}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'admin'}</h3>
        <p>
          {clazz.admin}
          {wallet && clazz.issuer === wallet.bech32Address && (
            <span className={styles.activeAccount}>{'(active account)'}</span>
          )}
        </p>
      </div>
      <Link href={`/classes/${clazz.id}`}>{'view class'}</Link>
    </div>
  )
}

export default ClassesListItem
