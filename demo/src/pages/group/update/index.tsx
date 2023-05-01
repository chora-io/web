import * as React from "react"

import Main from "../../../layouts/Main"
import Seo from "../../../components/SeoWrapper"

import MsgLeaveGroup from "../../../components/group/update/MsgLeaveGroup"
import MsgUpdateGroupAdmin from "../../../components/group/update/MsgUpdateGroupAdmin"
import MsgUpdateGroupMembers from "../../../components/group/update/MsgUpdateGroupMembers"
import MsgUpdateGroupMetadata from "../../../components/group/update/MsgUpdateGroupMetadata"
import QueryGroup from "../../../components/group/create/QueryGroup"
import QueryGroupMembers from "../../../components/group/create/QueryGroupMembers"

import * as styles from "./index.module.css"

const UpdatePage = ({ location }) => (
  <Main location={location}>
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
