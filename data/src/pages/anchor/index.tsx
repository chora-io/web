import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import MsgAnchor from "../../components/anchor/MsgAnchor"
import QueryAnchorByHash from "../../components/anchor/QueryAnchorByHash"
import QueryAnchorByIRI from "../../components/anchor/QueryAnchorByIRI"

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
