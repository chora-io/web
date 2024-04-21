'use client'

import VouchersListItem from '@components/vouchers/VouchersListItem'

const VouchersList = ({ vouchers }: any) => {
  return (
    <>
      {vouchers &&
        vouchers.map((voucher: any) => (
          <VouchersListItem key={voucher.id} voucher={voucher} />
        ))}
    </>
  )
}

export default VouchersList
