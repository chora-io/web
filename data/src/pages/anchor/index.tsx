import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"
import MsgAnchor from "../../components/anchor/MsgAnchor"
import QueryAnchor from "../../components/anchor/QueryAnchor"

import * as styles from "./index.module.css"

const Anchor = () => {

  // ...

  return (
    <Main>
      <div className={styles.container}>
        <div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"anchor data"}
            </div>
            <MsgAnchor />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"search anchor by iri"}
            </div>
            <QueryAnchor />
          </div>
        </div>
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default Anchor
