import * as React from "react"

import Main from "../../layouts/Main"
import Voucher from "../../components/vouchers/Voucher"
import Vouchers from "../../components/vouchers/Vouchers"
import Seo from "../../components/SeoWrapper"

import * as styles from "./index.module.css"

const VouchersPage = ({ location }) => {

  const urlParams = new URLSearchParams(location["search"])
  const voucherId = urlParams.get("id")

  return (
    <Main>
      <div className={styles.page}>
        {voucherId ? (
          <div>
            <h1>
              {"voucher"}
            </h1>
            <div className={styles.section}>
              <Voucher
                voucherId={voucherId}
              />
            </div>
          </div>
        ) : (
          <div>
            <h1>
              {"vouchers"}
            </h1>
            <div className={styles.section}>
              <Vouchers />
            </div>
          </div>
        )}
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default VouchersPage
