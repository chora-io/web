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

const Update = () => (
  <Main>
    <div className={styles.page}>
      <div>
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

export default Update
