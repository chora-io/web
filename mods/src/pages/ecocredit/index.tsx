import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import MsgCreateBatch from "../../components/ecocredit/MsgCreateBatch"
import MsgCreateClass from "../../components/ecocredit/MsgCreateClass"
import MsgCreateProject from "../../components/ecocredit/MsgCreateProject"
import QueryBatch from "../../components/ecocredit/QueryBatch"
import QueryClass from "../../components/ecocredit/QueryClass"
import QueryProject from "../../components/ecocredit/QueryProject"

import * as styles from "./index.module.css"

const EcocreditPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"ecocredit module"}
        </h1>
        <MsgCreateBatch />
        <MsgCreateClass />
        <MsgCreateProject />
        <QueryBatch />
        <QueryClass />
        <QueryProject />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default EcocreditPage
