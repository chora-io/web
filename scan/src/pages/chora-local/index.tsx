import * as React from "react"

import { choraLocal } from "chora/chains"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Accounts from "../../components/chain/Accounts"
import Transactions from "../../components/chain/Transactions"
import Validators from "../../components/chain/Validators"
import Account from "../../components/chain/account/Account"
import Transaction from "../../components/chain/transaction/Transaction"

import * as styles from "./index.module.css"

const ChoraLocalPage = ({ location }: any) => {

  const urlParams = new URLSearchParams(location["search"])
  const address = urlParams.get("address")
  const tx = urlParams.get("tx")

  return (
    <Main location={location}>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1>
              {choraLocal.chainName}
            </h1>
          </div>
          <div>
            <h3>
              {`(${choraLocal.chainId})`}
            </h3>
          </div>
        </div>
        {address && (
          <div className={styles.content}>
            <Account rest={choraLocal.rest} address={address} />
          </div>
        )}
        {tx && (
          <div className={styles.content}>
            <Transaction rest={choraLocal.rest} tx={tx} />
          </div>
        )}
        {!address && !tx && (
          <div className={styles.content}>
            <Validators rest={choraLocal.rest} />
            <Accounts chainId={choraLocal.chainId} rest={choraLocal.rest} />
            <Transactions chainId={choraLocal.chainId} rest={choraLocal.rest} />
          </div>
        )}
      </div>
    </Main>
  )
}

export const Head = () => <Seo title={`scan | ${choraLocal.chainName}`} />

export default ChoraLocalPage
