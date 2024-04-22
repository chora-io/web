'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useMetadata, useVoucher } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

import styles from './Voucher.module.css'

const Voucher = () => {
  const { id } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch voucher from selected network
  const [voucher, voucherError] = useVoucher(chainInfo, `${id}`)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    voucher ? voucher.metadata : null,
  )

  const error = voucherError || metadataError

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
        <p>{voucher?.issuer ? <Address address={voucher.issuer} /> : 'NA'}</p>
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
