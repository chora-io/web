import * as React from "react"

import Main from "../../layouts/Main"
import GroupMembers from "../../components/members/GroupMembers";
import Seo from "../../components/SeoWrapper"

import * as styles from "./index.module.css"

const Members = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"group members"}
        </h1>
        <div className={styles.section}>
          <GroupMembers />
        </div>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default Members
