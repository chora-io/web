import * as React from "react"

import Main from "../../../layouts/Main"
import Seo from "../../../components/SeoWrapper"

import MsgCreateGroup from "../../../components/group/create/MsgCreateGroup"
import MsgCreateGroupWithPolicy from "../../../components/group/create/MsgCreateGroupWithPolicy"
import QueryGroup from "../../../components/group/create/QueryGroup"
import QueryGroupMembers from "../../../components/group/create/QueryGroupMembers"

import * as styles from "./index.module.css"

const CreatePage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <MsgCreateGroup />
        <MsgCreateGroupWithPolicy />
        <QueryGroup />
        <QueryGroupMembers />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default CreatePage
