import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Accounts from "../../components/chain/Accounts"
import Transactions from "../../components/chain/Transactions"
import Validators from "../../components/chain/Validators"
import Account from "../../components/chain/account/Account"
import Transaction from "../../components/chain/transaction/Transaction"

import * as styles from "./index.module.css"

import { regenRedwood } from "chora/utils/chains"

const RegenRedwoodPage = ({ location }: any) => {

  const urlParams = new URLSearchParams(location["search"])
  const address = urlParams.get("address")
  const tx = urlParams.get("tx")

  return (
    <Main location={location}>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1>
              {regenRedwood.chainName}
            </h1>
          </div>
          <div>
            <h3>
              {`(${regenRedwood.chainId})`}
            </h3>
          </div>
        </div>
        {address && (
          <div className={styles.content}>
            <Account rest={regenRedwood.rest} address={address} />
          </div>
        )}
        {tx && (
          <div className={styles.content}>
            <Transaction rest={regenRedwood.rest} tx={tx} />
          </div>
        )}
        {!address && !tx && (
          <div className={styles.content}>
            <Validators rest={regenRedwood.rest} />
            <Accounts chainId={regenRedwood.chainId} rest={regenRedwood.rest} />
            <Transactions chainId={regenRedwood.chainId} rest={regenRedwood.rest} />
          </div>
        )}
      </div>
    </Main>
  )
}

export const Head = () => <Seo title={`scan | ${regenRedwood.chainName}`} />

export default RegenRedwoodPage
