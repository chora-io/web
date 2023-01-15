import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import MsgCreateGroup from "../../components/create/MsgCreateGroup"
import MsgCreateGroupWithPolicy from "../../components/create/MsgCreateGroupWithPolicy"
import QueryGroup from "../../components/create/QueryGroup"
import QueryGroupMembers from "../../components/create/QueryGroupMembers"

import * as styles from "./index.module.css"

const Create = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <div className={styles.section}>
          <div>
            {"create group"}
          </div>
          <MsgCreateGroup />
        </div>
        <div className={styles.section}>
          <div>
            {"create group with policy"}
          </div>
          <MsgCreateGroupWithPolicy />
        </div>
        <div className={styles.section}>
          <div>
            {"search group by id"}
          </div>
          <QueryGroup />
        </div>
        <div className={styles.section}>
          <div>
            {"search group members by id"}
          </div>
          <QueryGroupMembers />
        </div>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default Create
