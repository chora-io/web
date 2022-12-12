import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"
import MsgCreateGroupPolicy from "../../components/policy/MsgCreateGroupPolicy"
import MsgUpdateGroupPolicyAdmin from "../../components/policy/MsgUpdateGroupPolicyAdmin"
import MsgUpdateGroupPolicyMetadata from "../../components/policy/MsgUpdateGroupPolicyMetadata"
import MsgUpdateGroupPolicyDecisionPolicy from "../../components/policy/MsgUpdateGroupPolicyDecisionPolicy"
import QueryGroupPolicy from "../../components/policy/QueryGroupPolicy"

import * as styles from "./index.module.css"

const Policy = () => {

  // ...

  return (
    <Main>
      <div className={styles.container}>
        <div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"create policy"}
            </div>
            <MsgCreateGroupPolicy />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"update policy admin"}
            </div>
            <MsgUpdateGroupPolicyAdmin />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"update policy metadata"}
            </div>
            <MsgUpdateGroupPolicyMetadata />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"update policy decision"}
            </div>
            <MsgUpdateGroupPolicyDecisionPolicy />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"search policy"}
            </div>
            <QueryGroupPolicy />
          </div>
        </div>
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default Policy
