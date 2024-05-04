'use client'

import * as React from 'react'
import { useContext } from 'react'

import { Result } from '..'
import { WalletContext } from '../../contexts'

import styles from './Basket.module.css'

const Basket = ({ basket, error, renderAddress }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'denom'}</h3>
        <p>{basket ? basket['basket_denom'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'name'}</h3>
        <p>{basket?.name || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'curator'}</h3>
        {basket && renderAddress ? (
          <p>{renderAddress(basket.curator)}</p>
        ) : (
          <p>
            {basket?.curator || 'NA'}
            {wallet && basket?.curator === wallet.bech32Address && (
              <span className={styles.activeAccount}>{'(active account)'}</span>
            )}
          </p>
        )}
      </div>
      <div className={styles.boxText}>
        <h3>{'credit type abbrev'}</h3>
        <p>{basket ? basket['credit_type_abbrev'] : 'NA'}</p>
      </div>
      {basket && !!basket['date_criteria']['min_start_date'] && (
        <div className={styles.boxText}>
          <h3>{'min start date'}</h3>
          <p>{basket['date_criteria']['min_start_date']}</p>
        </div>
      )}
      {basket && !!basket['date_criteria']['start_date_window'] && (
        <div className={styles.boxText}>
          <h3>{'start date window'}</h3>
          <p>{basket['date_criteria']['start_date_window']}</p>
        </div>
      )}
      {basket && !!basket['date_criteria']['years_in_the_past'] && (
        <div className={styles.boxText}>
          <h3>{'years in the past'}</h3>
          <p>{basket['date_criteria']['years_in_the_past']}</p>
        </div>
      )}
      <div className={styles.boxText}>
        <h3>{'exponent'}</h3>
        <p>{basket ? basket.exponent : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'disable auto retire'}</h3>
        <p>{basket && basket['disable_auto_retire'] ? 'true' : 'false'}</p>
      </div>
      <hr />
      <div className={styles.boxText}>
        <h3>{'data stored on blockchain network'}</h3>
        <pre>
          <p>{JSON.stringify(basket, null, ' ')}</p>
        </pre>
      </div>
      <Result error={error} />
    </div>
  )
}

export default Basket
