import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Dashboard from "../../components/dash/Dashboard"

import { regenLocal } from "chora/utils/chains"

import * as styles from "./index.module.css"

const LocalPage = ({ location }: any) => (
  <Main location={location}>
    <div className={styles.page}>
      <Dashboard
        chainId={regenLocal.chainId}
        chainName={regenLocal.chainName}
        rest={regenLocal.rest}
      />
    </div>
  </Main>
)

export const Head = () => <Seo title={`scan | ${regenLocal.chainName}`} />

export default LocalPage
