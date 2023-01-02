import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"

import MsgUpdateCurator from "../../components/update/MsgUpdateCurator"
import MsgUpdateMetadata from "../../components/update/MsgUpdateMetadata"
import QueryNode from "../../components/create/QueryNode"
import QueryNodes from "../../components/create/QueryNodes"
import QueryNodesByCurator from "../../components/create/QueryNodesByCurator"

import * as styles from "./index.module.css"

const Update = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <div className={styles.section}>
          <div>
            {"update node curator"}
          </div>
          <MsgUpdateCurator />
        </div>
        <div className={styles.section}>
          <div>
            {"update node metadata"}
          </div>
          <MsgUpdateMetadata />
        </div>
        <div className={styles.section}>
          <div>
            {"search node by id"}
          </div>
          <QueryNode />
        </div>
        <div className={styles.section}>
          <div>
            {"search all nodes"}
          </div>
          <QueryNodes />
        </div>
        <div className={styles.section}>
          <div>
            {"search nodes by curator"}
          </div>
          <QueryNodesByCurator />
        </div>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default Update
