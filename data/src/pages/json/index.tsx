import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"

import GetData from "../../components/json/GetData"
import GenerateHash from "../../components/json/GenerateHash"
import PostData from "../../components/json/PostData"

import * as styles from "./index.module.css"

const Hash = () => {

  // ...

  return (
    <Main>
      <div className={styles.container}>
        <div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"generate hash"}
            </div>
            <GenerateHash />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"post data to server"}
            </div>
            <PostData />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"get data from server"}
            </div>
            <GetData />
          </div>
        </div>
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default Hash
