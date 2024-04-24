'use client'

import * as React from 'react'
import { useContext } from 'react'

import { WalletContext } from '../../contexts'

import styles from './BasketsListItem.module.css'

const BasketsListItem = ({ basket, renderAddress, renderLink }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'denom'}</h3>
        <p>{basket.denom}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'name'}</h3>
        <p>{basket.name}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'curator'}</h3>
        <p>
          {renderAddress ? (
            renderAddress(basket.curator)
          ) : (
            <>
              {basket.curator}
              {wallet && basket.curator === wallet.bech32Address && (
                <span className={styles.activeAccount}>
                  {'(active account)'}
                </span>
              )}
            </>
          )}
        </p>
      </div>
      {renderLink && renderLink(basket.denom)}
    </div>
  )
}

export default BasketsListItem
