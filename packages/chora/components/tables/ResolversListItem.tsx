'use client'

import * as React from 'react'
import { useContext } from 'react'

import { WalletContext } from '../../contexts'

import styles from './ResolversListItem.module.css'

const ResolversListItem = ({ resolver, renderAddress, renderLink }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'id'}</h3>
        <p>{resolver['id']}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'url'}</h3>
        <p>{resolver['url']}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'manager'}</h3>
        <p>
          {renderAddress ? (
            renderAddress(resolver.manager)
          ) : (
            <>
              {resolver.manager}
              {wallet && resolver.manager === wallet.bech32Address && (
                <span className={styles.activeAccount}>
                  {'(active account)'}
                </span>
              )}
            </>
          )}
        </p>
      </div>
      {renderLink && renderLink(resolver.id)}
    </div>
  )
}

export default ResolversListItem
