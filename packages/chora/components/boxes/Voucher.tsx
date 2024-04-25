'use client'

import * as React from 'react'
import { useContext } from 'react'

import { Result } from '..'
import { WalletContext } from '../../contexts'

import styles from './Voucher.module.css'

const Voucher = ({ voucher, metadata, error, renderAddress }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.box}>
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
        <h3>{'issuer'}</h3>
        {voucher && renderAddress ? (
          <p>{renderAddress(voucher.issuer)}</p>
        ) : (
          <p>
            {voucher?.issuer || 'NA'}
            {wallet && voucher?.issuer === wallet.bech32Address && (
              <span className={styles.activeAccount}>{'(active account)'}</span>
            )}
          </p>
        )}
      </div>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Voucher
