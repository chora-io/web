import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import { useVoucherMetadata } from '@hooks/useVoucherMetadata'

import styles from './VoucherPreview.module.css'

const VoucherPreview = ({ voucher }: any) => {
  const { chainInfo } = useContext(WalletContext)

  // fetch voucher metadata from network server
  const [metadata, error] = useVoucherMetadata(chainInfo, voucher.metadata)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'name'}</h3>
        <p>{metadata && metadata['name'] ? metadata['name'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'issuer'}</h3>
        <p>{voucher?.issuer ? voucher.issuer : 'NA'}</p>
      </div>
      <Link href={`/vouchers/${voucher['id']}`}>{'view voucher'}</Link>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default VoucherPreview
