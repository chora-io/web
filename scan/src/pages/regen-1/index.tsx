import * as React from "react"

import { regenMainnet } from "chora/chains"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Accounts from "../../components/chain/Accounts"
import Transactions from "../../components/chain/Transactions"
import Validators from "../../components/chain/Validators"
import Account from "../../components/chain/account/Account"
import Transaction from "../../components/chain/transaction/Transaction"

import * as styles from "./index.module.css"

const RegenPage = ({ location }: any) => {

  const urlParams = new URLSearchParams(location["search"])
  const address = urlParams.get("address")
  const tx = urlParams.get("tx")

  return (
    <Main location={location}>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1>
              {regenMainnet.chainName}
            </h1>
          </div>
          <div>
            <h3>
              {`(${regenMainnet.chainId})`}
            </h3>
          </div>
        </div>
        {address && (
          <div className={styles.content}>
            <Account rest={regenMainnet.rest} address={address} />
          </div>
        )}
        {tx && (
          <div className={styles.content}>
            <Transaction rest={regenMainnet.rest} tx={tx} />
          </div>
        )}
        {!address && !tx && (
          <div className={styles.content}>
            <Validators rest={regenMainnet.rest} />
            <Accounts chainId={regenMainnet.chainId} rest={regenMainnet.rest} />
            <Transactions chainId={regenMainnet.chainId} rest={regenMainnet.rest} />
          </div>
        )}
      </div>
    </Main>
  )
}

export const Head = () => <Seo title={`scan | ${regenMainnet.chainName}`} />

export default RegenPage
