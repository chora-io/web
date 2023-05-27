import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Dashboard from "../../components/dash/Dashboard"

import * as styles from "./index.module.css"

import { choraTestnet } from "chora/utils/chains"

const TestnetPage = ({ location }: any) => (
  <Main location={location}>
    <div className={styles.page}>
      <Dashboard
        chainId={choraTestnet.chainId}
        chainName={choraTestnet.chainName}
        rest={choraTestnet.rest}
      />
    </div>
  </Main>
)

export const Head = () => <Seo title={`scan | ${choraTestnet.chainName}`} />

export default TestnetPage
