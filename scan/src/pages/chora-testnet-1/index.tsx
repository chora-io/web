import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Accounts from "../../components/chain/Accounts"
import Transactions from "../../components/chain/Transactions"
import Validators from "../../components/chain/Validators"
import Account from "../../components/chain/account/Account"
import Transaction from "../../components/chain/transaction/Transaction"

import * as styles from "./index.module.css"

import { choraTestnet } from "chora/utils/chains"

const ChoraTestnetPage = ({ location }: any) => {

  const urlParams = new URLSearchParams(location["search"])
  const address = urlParams.get("address")
  const tx = urlParams.get("tx")

  return (
    <Main location={location}>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1>
              {choraTestnet.chainName}
            </h1>
          </div>
          <div>
            <h3>
              {`(${choraTestnet.chainId})`}
            </h3>
          </div>
        </div>
        {address && (
          <div className={styles.content}>
            <Account rest={choraTestnet.rest} address={address} />
          </div>
        )}
        {tx && (
          <div className={styles.content}>
            <Transaction rest={choraTestnet.rest} tx={tx} />
          </div>
        )}
        {!address && !tx && (
          <div className={styles.content}>
            <Validators rest={choraTestnet.rest} />
            <Accounts chainId={choraTestnet.chainId} rest={choraTestnet.rest} />
            <Transactions chainId={choraTestnet.chainId} rest={choraTestnet.rest} />
          </div>
        )}
      </div>
    </Main>
  )
}

export const Head = () => <Seo title={`scan | ${choraTestnet.chainName}`} />

export default ChoraTestnetPage
