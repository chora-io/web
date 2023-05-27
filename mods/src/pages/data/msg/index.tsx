import * as React from "react"

import Main from "../../../layouts/Main"
import Seo from "../../../components/SeoWrapper"

import MsgAnchor from "../../../components/data/msg/MsgAnchor"
import MsgAttest from "../../../components/data/msg/MsgAttest"
import MsgDefineResolver from "../../../components/data/msg/MsgDefineResolver"
import MsgRegisterResolver from "../../../components/data/msg/MsgRegisterResolver"

import * as styles from "./index.module.css"

const DataMsgPage = ({ location }) => (
  <Main location={location}>
    <div className={styles.page}>
      <div>
        <MsgAnchor />
        <MsgAttest />
        <MsgDefineResolver />
        <MsgRegisterResolver />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default DataMsgPage
