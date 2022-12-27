import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"

import MsgAnchor from "../../components/anchor/MsgAnchor"
import QueryAnchorByIRI from "../../components/anchor/QueryAnchorByIRI"
import QueryAnchorByHash from "../../components/anchor/QueryAnchorByHash"

import * as styles from "./index.module.css"

const Anchor = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <div className={styles.section}>
          <div>
            {"anchor data"}
          </div>
          <MsgAnchor />
        </div>
        <div className={styles.section}>
          <div>
            {"search data anchor by iri"}
          </div>
          <QueryAnchorByIRI />
        </div>
        <div className={styles.section}>
          <div>
            {"search data anchor by content hash"}
          </div>
          <QueryAnchorByHash />
        </div>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default Anchor
