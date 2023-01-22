import * as React from "react"

import Main from "../../layouts/Main"
import Faucet from "../../components/FaucetWrapper"
import Seo from "../../components/SeoWrapper"

import * as styles from "./index.module.css"

const FaucetPage = () => (
  <Main withWallet={true}>
    <div className={styles.page}>
      <Faucet />
    </div>
  </Main>
)

export const Head = () => <Seo title="chora | testnet faucet" />

export default FaucetPage
