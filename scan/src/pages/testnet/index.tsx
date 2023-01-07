import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"

import Dashboard from "../../components/dash/Dashboard"

import * as styles from "./index.module.css"

import { choraTestnet } from "chora/utils/chains"

const Testnet = () => (
  <Main>
    <div className={styles.page}>
      <Dashboard
        chainId={choraTestnet.chainId}
        chainName={choraTestnet.chainName}
        rest={choraTestnet.rest}
      />
    </div>
  </Main>
)

export const Head = () => <Seo title="scan | chora testnet" />

export default Testnet
