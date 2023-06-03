import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import MsgCreate from "../../components/voucher/MsgCreate"
import MsgIssue from "../../components/voucher/MsgIssue"
import MsgUpdateIssuer from "../../components/voucher/MsgUpdateIssuer"
import MsgUpdateMetadata from "../../components/voucher/MsgUpdateMetadata"
import QueryBalance from "../../components/voucher/QueryBalance"
import QueryBalancesByAddress from "../../components/voucher/QueryBalancesByAddress"
import QueryBalancesByVoucher from "../../components/voucher/QueryBalancesByVoucher"
import QueryVoucher from "../../components/voucher/QueryVoucher"
import QueryVouchers from "../../components/voucher/QueryVouchers"
import QueryVouchersByIssuer from "../../components/voucher/QueryVouchersByIssuer"

import * as styles from "./index.module.css"

const VoucherPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"voucher module"}
        </h1>
        <MsgCreate />
        <MsgIssue />
        <MsgUpdateIssuer />
        <MsgUpdateMetadata />
        <QueryBalance />
        <QueryBalancesByAddress />
        <QueryBalancesByVoucher />
        <QueryVoucher />
        <QueryVouchers />
        <QueryVouchersByIssuer />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default VoucherPage
