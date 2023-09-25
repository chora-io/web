'use client'

// import { Metadata } from 'next'
import { useSearchParams } from 'next/navigation'

import { choraTestnet } from "chora/chains"

import Accounts from "@components/chain/Accounts"
import Transactions from "@components/chain/Transactions"
import Validators from "@components/chain/Validators"
import Account from "@components/chain/account/Account"
import Transaction from "@components/chain/transaction/Transaction"

import styles from "./page.module.css"

// export const metadata: Metadata = {
//   title: choraTestnet.chainId,
// }

const ChoraTestnetPage = () => {

  const searchParams = useSearchParams()

  const address = searchParams.get("address")
  const tx = searchParams.get("tx")

  return (
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
  )
}

export default ChoraTestnetPage
