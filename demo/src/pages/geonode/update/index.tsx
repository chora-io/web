import * as React from "react"

import Main from "../../../layouts/Main"
import Seo from "../../../components/SeoWrapper"

import MsgUpdateCurator from "../../../components/geonode/update/MsgUpdateCurator"
import MsgUpdateMetadata from "../../../components/geonode/update/MsgUpdateMetadata"
import QueryNode from "../../../components/geonode/create/QueryNode"
import QueryNodes from "../../../components/geonode/create/QueryNodes"
import QueryNodesByCurator from "../../../components/geonode/create/QueryNodesByCurator"

import * as styles from "./index.module.css"

const UpdatePage = ({ location }) => (
  <Main location={location}>
    <div className={styles.page}>
      <div>
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

export default UpdatePage
