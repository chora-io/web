'use client'

// import { Metadata } from 'next'

import { ConnectWallet, Faucet } from "chora/components"

import styles from "./page.module.css"

// export const metadata: Metadata = {
//   title: 'faucet',
// }

const FaucetPage = () => (
  <div className={styles.page}>
    <div>
      <ConnectWallet />
      <Faucet />
    </div>
  </div>
)

export default FaucetPage
