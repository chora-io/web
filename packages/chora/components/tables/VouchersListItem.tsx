'use client'

import * as React from 'react'
import { useContext } from 'react'

import { Result } from '..'
import { WalletContext } from '../../contexts'
import { useMetadata } from '../../hooks'

import styles from './VouchersListItem.module.css'

const VouchersListItem = ({ voucher, renderAddress, renderLink }: any) => {
  const { chainInfo, wallet } = useContext(WalletContext)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, error] = useMetadata(chainInfo, voucher.metadata)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'name'}</h3>
        <p>{metadata && metadata['name'] ? metadata['name'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'issuer'}</h3>
        <p>
          {renderAddress ? (
            renderAddress(voucher.issuer)
          ) : (
            <>
              {voucher.issuer}
              {wallet && voucher.issuer === wallet.bech32Address && (
                <span className={styles.activeAccount}>
                  {'(active account)'}
                </span>
              )}
            </>
          )}
        </p>
      </div>
      {renderLink && renderLink(voucher.id)}
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default VouchersListItem
