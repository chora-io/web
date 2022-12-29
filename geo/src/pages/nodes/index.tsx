import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"

import ViewNodes from "../../components/nodes/ViewNodes"

import * as styles from "./index.module.css"

const Nodes = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <div className={styles.section}>
          <div>
            {"view all nodes"}
          </div>
          <ViewNodes />
        </div>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default Nodes
