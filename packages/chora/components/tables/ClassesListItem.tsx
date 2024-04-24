'use client'

import * as React from 'react'
import { useContext } from 'react'

import { WalletContext } from '../../contexts'

import styles from './ClassesListItem.module.css'

const ClassesListItem = ({ clazz, renderAddress, renderLink }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'id'}</h3>
        <p>{clazz.id}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'credit type abbrev'}</h3>
        <p>{clazz['credit_type_abbrev']}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'admin'}</h3>
        <p>
          {renderAddress ? (
            renderAddress(clazz.admin)
          ) : (
            <>
              {clazz.admin}
              {wallet && clazz.admin === wallet.bech32Address && (
                <span className={styles.activeAccount}>
                  {'(active account)'}
                </span>
              )}
            </>
          )}
        </p>
      </div>
      {renderLink && renderLink(clazz.id)}
    </div>
  )
}

export default ClassesListItem
