import * as React from "react"

import Main from "../../../layouts/Main"
import Seo from "../../../components/SeoWrapper"

import MsgCreate from "../../../components/geonode/msg/MsgCreate"
import MsgUpdateCurator from "../../../components/geonode/msg/MsgUpdateCurator"
import MsgUpdateMetadata from "../../../components/geonode/msg/MsgUpdateMetadata"

import * as styles from "./index.module.css"

const GeonodeMsgPage = ({ location }) => (
  <Main location={location}>
    <div className={styles.page}>
      <div>
        <MsgCreate />
        <MsgUpdateCurator />
        <MsgUpdateMetadata />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default GeonodeMsgPage
