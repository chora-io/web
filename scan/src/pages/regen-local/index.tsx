import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Accounts from "../../components/chain/Accounts"
import Transactions from "../../components/chain/Transactions"
import Validators from "../../components/chain/Validators"
import Account from "../../components/chain/account/Account"
import Transaction from "../../components/chain/transaction/Transaction"

import { regenLocal } from "chora/utils/chains"

import * as styles from "./index.module.css"

const RegenLocalPage = ({ location }: any) => {

  const urlParams = new URLSearchParams(location["search"])
  const address = urlParams.get("address")
  const tx = urlParams.get("tx")

  return (
    <Main location={location}>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1>
              {regenLocal.chainName}
            </h1>
          </div>
          <div>
            <h3>
              {`(${regenLocal.chainId})`}
            </h3>
          </div>
        </div>
        {address && (
          <div className={styles.content}>
            <Account rest={regenLocal.rest} address={address} />
          </div>
        )}
        {tx && (
          <div className={styles.content}>
            <Transaction rest={regenLocal.rest} tx={tx} />
          </div>
        )}
        {!address && !tx && (
          <div className={styles.content}>
            <Validators rest={regenLocal.rest} />
            <Accounts chainId={regenLocal.chainId} rest={regenLocal.rest} />
            <Transactions chainId={regenLocal.chainId} rest={regenLocal.rest} />
          </div>
        )}
      </div>
    </Main>
  )
}

export const Head = () => <Seo title={`scan | ${regenLocal.chainName}`} />

export default RegenLocalPage
