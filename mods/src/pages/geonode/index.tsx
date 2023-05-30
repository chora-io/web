import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import MsgCreate from "../../components/geonode/MsgCreate"
import MsgUpdateCurator from "../../components/geonode/MsgUpdateCurator"
import MsgUpdateMetadata from "../../components/geonode/MsgUpdateMetadata"
import QueryNode from "../../components/geonode/QueryNode"
import QueryNodes from "../../components/geonode/QueryNodes"
import QueryNodesByCurator from "../../components/geonode/QueryNodesByCurator"

import * as styles from "./index.module.css"

const GeonodePage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"geonode module"}
        </h1>
        <MsgCreate />
        <MsgUpdateCurator />
        <MsgUpdateMetadata />
        <QueryNode />
        <QueryNodes />
        <QueryNodesByCurator />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default GeonodePage
