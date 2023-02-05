import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import MsgCreate from "../../components/create/MsgCreate"
import QueryNode from "../../components/create/QueryNode"
import QueryNodes from "../../components/create/QueryNodes"
import QueryNodesByCurator from "../../components/create/QueryNodesByCurator"

import * as styles from "./index.module.css"

const CreatePage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <MsgCreate />
        <QueryNode />
        <QueryNodes />
        <QueryNodesByCurator />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default CreatePage
