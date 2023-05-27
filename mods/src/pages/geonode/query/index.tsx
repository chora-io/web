import * as React from "react"

import Main from "../../../layouts/Main"
import Seo from "../../../components/SeoWrapper"

import QueryNode from "../../../components/geonode/query/QueryNode"
import QueryNodes from "../../../components/geonode/query/QueryNodes"
import QueryNodesByCurator from "../../../components/geonode/query/QueryNodesByCurator"

import * as styles from "./index.module.css"

const GeonodeQueryPage = ({ location }) => (
  <Main location={location}>
    <div className={styles.page}>
      <div>
        <QueryNode />
        <QueryNodes />
        <QueryNodesByCurator />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default GeonodeQueryPage
