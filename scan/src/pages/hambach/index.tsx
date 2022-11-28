import * as React from "react";

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"
import Dashboard from "../../components/dash/Dashboard"

import * as styles from "./index.module.css"

import { regenHambach } from "../../utils/chains"

const Hambach = () => (
  <Main>
    <div className={styles.container} >
      <Dashboard name={regenHambach.chainName} />
    </div>
  </Main>
)

export const Head = () => <Seo title="scan | regen hambach" />

export default Hambach
