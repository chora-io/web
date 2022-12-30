import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"

import MsgCreate from "../../components/node/MsgCreate"
import MsgUpdateCurator from "../../components/node/MsgUpdateCurator"
import MsgUpdateMetadata from "../../components/node/MsgUpdateMetadata"
import QueryNode from "../../components/node/QueryNode"
import QueryNodes from "../../components/node/QueryNodes"
import QueryNodesByCurator from "../../components/node/QueryNodesByCurator"

import * as styles from "./index.module.css"

const Node = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <div className={styles.section}>
          <div>
            {"create node"}
          </div>
          <MsgCreate />
        </div>
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

export default Node
