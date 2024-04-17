'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import VoucherPreview from '@components/groups/vouchers/VoucherPreview'
import { useGroupVouchers } from '@hooks/useGroupVouchers'

import styles from './Vouchers.module.css'

const Vouchers = () => {
  const { groupId } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch vouchers issued by group from selected network
  const [vouchers, error] = useGroupVouchers(chainInfo, groupId)

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
