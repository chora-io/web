import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"
import MsgCreateGroup from "../../components/create/MsgCreateGroup"
import QueryGroup from "../../components/create/QueryGroup"

import * as styles from "./index.module.css"

const Create = () => {

  // ...

  return (
    <Main>
      <div className={styles.container}>
        <div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"create group"}
            </div>
            <MsgCreateGroup />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"search group by id"}
            </div>
            <QueryGroup />
          </div>
        </div>
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default Create
