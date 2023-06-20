import * as React from "react"
import { useState } from "react"

import { geonodeModule } from "chora/modules"

import Main from "../../layouts/Main"
import MoreInfo from "../../components/MoreInfo"
import Seo from "../../components/SeoWrapper"

import MsgCreate from "../../components/geonode/MsgCreate"
import MsgUpdateCurator from "../../components/geonode/MsgUpdateCurator"
import MsgUpdateMetadata from "../../components/geonode/MsgUpdateMetadata"
import QueryNode from "../../components/geonode/QueryNode"
import QueryNodes from "../../components/geonode/QueryNodes"
import QueryNodesByCurator from "../../components/geonode/QueryNodesByCurator"

import * as styles from "./index.module.css"

const GeonodePage = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false)

  const handleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <Main>
      <div className={styles.page}>
        <div>
          <h1>
            {"geonode module"}
          </h1>
          <button className={styles.infoButton} onClick={handleShowInfo}>
            {showInfo ? "less info" : "more info"}
          </button>
          <div className={styles.box}>
            {showInfo && <MoreInfo module={geonodeModule} />}
            <ul>
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
          <MsgCreate/>
          <MsgUpdateCurator/>
          <MsgUpdateMetadata/>
          <QueryNode/>
          <QueryNodes/>
          <QueryNodesByCurator/>
        </div>
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default GeonodePage
