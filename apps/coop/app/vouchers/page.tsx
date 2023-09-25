'use client'

// import { Metadata } from 'next'
import { useSearchParams } from 'next/navigation'

import Balance from "@components/vouchers/Balance"
import Balances from "@components/vouchers/Balances"
import Voucher from "@components/vouchers/Voucher"
import Vouchers from "@components/vouchers/Vouchers"

import styles from "./page.module.css"

// export const metadata: Metadata = {
//   title: 'vouchers',
// }

const VouchersPage = () => {

  const searchParams = useSearchParams()

  const voucherId = searchParams.get("id")
  const address = searchParams.get("address")

  return (
    <div className={styles.page}>
      {!voucherId && !address && (
        <div>
          <h1>
            {"vouchers"}
          </h1>
          <Vouchers />
        </div>
      )}
      {voucherId && !address && (
        <div>
          <h1>
            {"voucher"}
          </h1>
          <Voucher
            voucherId={voucherId}
          />
          <h1>
            {"balances"}
          </h1>
          <Balances
            voucherId={voucherId}
          />
        </div>
      )}
      {voucherId && address && (
        <div>
          <h1>
            {"balance"}
          </h1>
          <Balance
            voucherId={voucherId}
            address={address}
          />
        </div>
      )}
    </div>
  )
}

export default VouchersPage
