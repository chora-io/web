import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import MsgUpdateCurator from "../../components/update/MsgUpdateCurator"
import MsgUpdateMetadata from "../../components/update/MsgUpdateMetadata"
import QueryNode from "../../components/create/QueryNode"
import QueryNodes from "../../components/create/QueryNodes"
import QueryNodesByCurator from "../../components/create/QueryNodesByCurator"

import * as styles from "./index.module.css"

const UpdatePage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <MsgUpdateCurator />
        <MsgUpdateMetadata />
        <QueryNode />
        <QueryNodes />
        <QueryNodesByCurator />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default UpdatePage
