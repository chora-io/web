import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import MsgRegisterAccount from "../../components/intertx/MsgRegisterAccount"
import MsgSubmitTx from "../../components/intertx/MsgSubmitTx"
import QueryInterchainAccount from "../../components/intertx/QueryInterchainAccount"

import * as styles from "./index.module.css"

const InterTxPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"intertx module"}
        </h1>
        <MsgRegisterAccount />
        <MsgSubmitTx />
        <QueryInterchainAccount />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default InterTxPage
