'use client'

import * as React from 'react'
import { useContext } from 'react'

import { Result } from '..'
import { WalletContext } from '../../contexts'

import styles from './Resolvers.module.css'

const Resolvers = ({ resolvers, error, renderAddress }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      {!resolvers ||
        (resolvers.length === 0 && (
          <div className={styles.boxText}>
            <p>{'no resolvers found'}</p>
          </div>
        ))}
      {Array.isArray(resolvers) &&
        resolvers.map((resolver: any) => (
          <div className={styles.boxItem} key={resolver['id']}>
            <div className={styles.boxText}>
              <h3>{'id'}</h3>
              <p>{resolver ? resolver['id'] : 'NA'}</p>
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
            <div className={styles.boxText}>
              <h3>{'url'}</h3>
              <p>{resolver ? resolver['url'] : 'NA'}</p>
            </div>
          </div>
        ))}
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Resolvers
