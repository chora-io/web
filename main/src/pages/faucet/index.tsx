import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"

import FaucetWrapper from "../../components/FaucetWrapper"

import * as styles from "./index.module.css"

const Faucet = () => (
  <Main withWallet={true}>
    <div className={styles.page}>
      <FaucetWrapper />
    </div>
  </Main>
)

export const Head = () => <Seo title="chora | testnet faucet" />

export default Faucet
