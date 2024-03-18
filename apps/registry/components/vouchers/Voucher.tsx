'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useVoucher } from '@hooks/useVoucher'

import styles from './Voucher.module.css'

const Voucher = () => {
  const { id } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch voucher and voucher metadata from selected network and network server
  const [voucher, metadata, error] = useVoucher(chainInfo, `${id}`)

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
        <p>{voucher?.issuer ? voucher.issuer : 'NA'}</p>
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
