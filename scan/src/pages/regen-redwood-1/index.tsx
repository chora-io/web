import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Dashboard from "../../components/dash/Dashboard"

import * as styles from "./index.module.css"

import { regenRedwood } from "chora/utils/chains"

const RedwoodPage = ({ location }: any) => (
  <Main location={location}>
    <div className={styles.page}>
      <Dashboard
        chainId={regenRedwood.chainId}
        chainName={regenRedwood.chainName}
        rest={regenRedwood.rest}
      />
    </div>
  </Main>
)

export const Head = () => <Seo title={`scan | ${regenRedwood.chainName}`} />

export default RedwoodPage
