'use client'

import VouchersTableRow from '@components/vouchers/VouchersTableRow'

import styles from './VouchersTable.module.css'

const VouchersTable = ({ vouchers }: any) => {
  return (
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
            <VouchersTableRow key={voucher.id} voucher={voucher} />
          ))}
      </tbody>
    </table>
  )
}

export default VouchersTable
