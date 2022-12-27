import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"

import MsgCreateGroup from "../../components/group/MsgCreateGroup"
import MsgCreateGroupWithPolicy from "../../components/group/MsgCreateGroupWithPolicy"
import MsgLeaveGroup from "../../components/group/MsgLeaveGroup"
import MsgUpdateGroupAdmin from "../../components/group/MsgUpdateGroupAdmin"
import MsgUpdateGroupMembers from "../../components/group/MsgUpdateGroupMembers"
import MsgUpdateGroupMetadata from "../../components/group/MsgUpdateGroupMetadata"
import QueryGroup from "../../components/group/QueryGroup"
import QueryGroupMembers from "../../components/group/QueryGroupMembers"

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
            {"update group admin"}
          </div>
          <MsgUpdateGroupAdmin />
        </div>
        <div className={styles.section}>
          <div>
            {"update group members"}
          </div>
          <MsgUpdateGroupMembers />
        </div>
        <div className={styles.section}>
          <div>
            {"update group metadata"}
          </div>
          <MsgUpdateGroupMetadata />
        </div>
        <div className={styles.section}>
          <div>
            {"leave group"}
          </div>
          <MsgLeaveGroup />
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
