import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Dashboard from "../../components/dash/Dashboard"

import * as styles from "./index.module.css"

import { regenMainnet } from "chora/utils/chains"

const RegenPage = ({ location }: any) => (
  <Main location={location}>
    <div className={styles.page}>
      <Dashboard
        chainId={regenMainnet.chainId}
        chainName={regenMainnet.chainName}
        rest={regenMainnet.rest}
      />
    </div>
  </Main>
)

export const Head = () => <Seo title={`scan | ${regenMainnet.chainName}`} />

export default RegenPage
