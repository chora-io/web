'use client'

import * as React from 'react'

import { VouchersListItem } from '.'

import styles from './VouchersList.module.css'

const VouchersList = ({ vouchers, renderAddress, renderLink }: any) => {
  return (
    <div className={styles.list}>
      {vouchers &&
        vouchers.map((voucher: any) => (
          <VouchersListItem
            key={voucher.id}
            voucher={voucher}
            renderAddress={renderAddress}
            renderLink={renderLink}
          />
        ))}
    </div>
  )
}

export default VouchersList
