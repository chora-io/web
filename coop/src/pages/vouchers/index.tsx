import * as React from "react"

import Main from "../../layouts/Main"
import Balance from "../../components/vouchers/Balance"
import Balances from "../../components/vouchers/Balances"
import Voucher from "../../components/vouchers/Voucher"
import Vouchers from "../../components/vouchers/Vouchers"
import Seo from "../../components/SeoWrapper"

import * as styles from "./index.module.css"

const VouchersPage = ({ location }) => {

  const urlParams = new URLSearchParams(location["search"])
  const voucherId = urlParams.get("id")
  const address = urlParams.get("address")

  return (
    <Main>
      <div className={styles.page}>
        {!voucherId && !address && (
          <div>
            <h1>
              {"vouchers"}
            </h1>
            <div className={styles.section}>
              <Vouchers />
            </div>
          </div>
        )}
        {voucherId && !address && (
          <div>
            <h1>
              {"voucher"}
            </h1>
            <div className={styles.section}>
              <Voucher
                voucherId={voucherId}
              />
            </div>
            <h1>
              {"balances"}
            </h1>
            <div className={styles.section}>
              <Balances
                voucherId={voucherId}
              />
            </div>
          </div>
        )}
        {voucherId && address && (
          <div>
            <h1>
              {"balance"}
            </h1>
            <div className={styles.section}>
              <Balance
                voucherId={voucherId}
                address={address}
              />
            </div>
          </div>
        )}
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default VouchersPage
