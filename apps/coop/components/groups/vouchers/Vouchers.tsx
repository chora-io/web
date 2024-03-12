'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext } from 'react'

import VoucherPreview from '@components/groups/vouchers/VoucherPreview'
import { useVouchers } from '@hooks/useVouchers'

import styles from './Vouchers.module.css'

const Vouchers = () => {
  const { chainInfo } = useContext(WalletContext)

  // fetch vouchers (curated by coop) from selected network
  const [vouchers, error] = useVouchers(chainInfo)

  return (
    <div className={styles.box}>
      {!error && !vouchers && <div>{'loading...'}</div>}
      {!error && vouchers && vouchers.length === 0 && (
        <div>{'no vouchers found'}</div>
      )}
      {Array.isArray(vouchers) &&
        vouchers.map((voucher) => (
          <VoucherPreview key={voucher['id']} voucher={voucher} />
        ))}
      <Result error={error} />
    </div>
  )
}

export default Vouchers
