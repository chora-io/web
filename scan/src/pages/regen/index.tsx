import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"

import Dashboard from "../../components/dash/Dashboard"

import * as styles from "./index.module.css"

import { regenMainnet } from "../../utils/chains"

const Regen = () => (
  <Main>
    <div className={styles.page}>
      <Dashboard
        chainId={regenMainnet.chainId}
        chainName={regenMainnet.chainName}
        rest={regenMainnet.rest}
      />
    </div>
  </Main>
)

export const Head = () => <Seo title="scan | regen" />

export default Regen
