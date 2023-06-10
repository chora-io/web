import * as React from "react"

import { geonodeModule } from "chora/modules"

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
        <div className={styles.box}>
          <p>
            {`api documentation: `}
            <a href={geonodeModule.apiDocumentation} target="_blank">
              {geonodeModule.apiDocumentation}
            </a>
          </p>
          <p>
            {`module specification: `}
            <a href={geonodeModule.moduleSpecification} target="_blank">
              {geonodeModule.moduleSpecification}
            </a>
          </p>
          <ul className={styles.boxTable}>
            <li>
              <a href="#msg-create">
                {'MsgCreate'}
              </a>
            </li>
            <li>
              <a href="#msg-update-curator">
                {'MsgUpdateCurator'}
              </a>
            </li>
            <li>
              <a href="#msg-update-metadata">
                {'MsgUpdateMetadata'}
              </a>
            </li>
            <li>
              <a href="#query-node">
                {'QueryNode'}
              </a>
            </li>
            <li>
              <a href="#query-nodes">
                {'QueryNodes'}
              </a>
            </li>
            <li>
              <a href="#query-nodes-by-curator">
                {'QueryNodesByCurator'}
              </a>
            </li>
          </ul>
        </div>
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
