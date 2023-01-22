import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Dashboard from "../../components/dash/Dashboard"

import * as styles from "./index.module.css"

import { regenHambach } from "chora/utils/chains"

const HambachPage = () => (
  <Main>
    <div className={styles.page}>
      <Dashboard
        chainId={regenHambach.chainId}
        chainName={regenHambach.chainName}
        rest={regenHambach.rest}
      />
    </div>
  </Main>
)

export const Head = () => <Seo title="scan | regen hambach" />

export default HambachPage
