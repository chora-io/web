import * as React from "react"

import Main from "../../../layouts/Main"
import Seo from "../../../components/SeoWrapper"

import MsgAnchor from "../../../components/data/anchor/MsgAnchor"
import QueryAnchorByHash from "../../../components/data/anchor/QueryAnchorByHash"
import QueryAnchorByIRI from "../../../components/data/anchor/QueryAnchorByIRI"

import * as styles from "./index.module.css"

const AnchorPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <MsgAnchor />
        <QueryAnchorByIRI />
        <QueryAnchorByHash />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default AnchorPage
