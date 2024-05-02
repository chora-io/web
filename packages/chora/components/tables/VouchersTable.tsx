'use client'

import * as React from 'react'

import { VouchersTableRow } from '.'

import styles from './VouchersTable.module.css'

const VouchersTable = ({ vouchers, renderAddress, renderLink }: any) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>{'id'}</td>
            <td>{'name'}</td>
            <td>{'description'}</td>
            <td>{'issuer'}</td>
            <td>{'more'}</td>
          </tr>
        </thead>
        <tbody>
          {vouchers &&
            vouchers.map((voucher: any) => (
              <VouchersTableRow
                key={voucher.id}
                voucher={voucher}
                renderAddress={renderAddress}
                renderLink={renderLink}
              />
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default VouchersTable
