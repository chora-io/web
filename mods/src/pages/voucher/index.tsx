import * as React from "react"

import { voucherModule } from "chora/modules"

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
        <div className={styles.box}>
          <p>
            {`specification: `}
            <a href={voucherModule.specification} target="_blank">
              {voucherModule.specification}
            </a>
          </p>
          <p>
            {`api documentation: `}
            <a href={voucherModule.apiDocumentation} target="_blank">
              {voucherModule.apiDocumentation}
            </a>
          </p>
          {voucherModule.apiVersion && (
            <p>
              {`api version: `}
              <a href={voucherModule.apiVersion} target="_blank">
                {voucherModule.apiVersion}
              </a>
            </p>
          )}
          <p>
            {`git repository: `}
            <a href={voucherModule.gitRepository} target="_blank">
              {voucherModule.gitRepository}
            </a>
          </p>
          {voucherModule.gitVersion && (
            <p>
              {`git version: `}
              <a href={voucherModule.gitVersion} target="_blank">
                {voucherModule.gitVersion}
              </a>
            </p>
          )}
          <ul className={styles.boxTable}>
            <li>
              <a href="#msg-create">
                {'MsgCreate'}
              </a>
            </li>
            <li>
              <a href="#msg-issue">
                {'MsgIssue'}
              </a>
            </li>
            <li>
              <a href="#msg-update-issuer">
                {'MsgUpdateIssuer'}
              </a>
            </li>
            <li>
              <a href="#msg-update-metadata">
                {'MsgUpdateMetadata'}
              </a>
            </li>
            <li>
              <a href="#query-balance">
                {'QueryBalance'}
              </a>
            </li>
            <li>
              <a href="#query-balances-by-address">
                {'QueryBalancesByAddress'}
              </a>
            </li>
            <li>
              <a href="#query-balances-by-voucher">
                {'QueryBalancesByVoucher'}
              </a>
            </li>
            <li>
              <a href="#query-voucher">
                {'QueryVoucher'}
              </a>
            </li>
            <li>
              <a href="#query-vouchers">
                {'QueryVouchers'}
              </a>
            </li>
            <li>
              <a href="#query-vouchers-by-issuer">
                {'QueryVouchersByIssuer'}
              </a>
            </li>
          </ul>
        </div>
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
