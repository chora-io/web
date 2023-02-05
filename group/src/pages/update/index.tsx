import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import MsgLeaveGroup from "../../components/update/MsgLeaveGroup"
import MsgUpdateGroupAdmin from "../../components/update/MsgUpdateGroupAdmin"
import MsgUpdateGroupMembers from "../../components/update/MsgUpdateGroupMembers"
import MsgUpdateGroupMetadata from "../../components/update/MsgUpdateGroupMetadata"
import QueryGroup from "../../components/create/QueryGroup"
import QueryGroupMembers from "../../components/create/QueryGroupMembers"

import * as styles from "./index.module.css"

const UpdatePage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <MsgUpdateGroupAdmin />
        <MsgUpdateGroupMembers />
        <MsgUpdateGroupMetadata />
        <MsgLeaveGroup />
        <QueryGroup />
        <QueryGroupMembers />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default UpdatePage
