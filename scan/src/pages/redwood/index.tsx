import * as React from "react";

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"
import Dashboard from "../../components/dash/Dashboard"

import * as styles from "./index.module.css"

import { regenRedwood } from "../../utils/chains"

const Redwood = () => (
  <Main>
    <div className={styles.container} >
      <Dashboard
        chainId={regenRedwood.chainId}
        chainName={regenRedwood.chainName}
        rest={regenRedwood.rest}
      />
    </div>
  </Main>
)

export const Head = () => <Seo title="scan | regen redwood" />

export default Redwood
