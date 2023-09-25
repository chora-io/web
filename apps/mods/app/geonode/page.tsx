'use client'

// import { Metadata } from 'next'
import { useState } from "react"

import { geonodeModule } from "chora/modules"

import MoreInfo from "@components/MoreInfo"
import MsgCreate from "@components/geonode/MsgCreate"
import MsgUpdateCurator from "@components/geonode/MsgUpdateCurator"
import MsgUpdateMetadata from "@components/geonode/MsgUpdateMetadata"
import QueryNode from "@components/geonode/QueryNode"
import QueryNodes from "@components/geonode/QueryNodes"
import QueryNodesByCurator from "@components/geonode/QueryNodesByCurator"

import styles from "./page.module.css"

// export const metadata: Metadata = {
//   title: 'geonode',
// }

const GeonodePage = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false)

  const handleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
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
  )
}

export default GeonodePage
