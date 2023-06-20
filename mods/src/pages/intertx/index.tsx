import * as React from "react"
import { useState } from "react"

import { intertxModule } from "chora/modules"

import Main from "../../layouts/Main"
import MoreInfo from "../../components/MoreInfo"
import Seo from "../../components/SeoWrapper"

import MsgRegisterAccount from "../../components/intertx/MsgRegisterAccount"
import MsgSubmitTx from "../../components/intertx/MsgSubmitTx"
import QueryInterchainAccount from "../../components/intertx/QueryInterchainAccount"

import * as styles from "./index.module.css"

const InterTxPage = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false)

  const handleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <Main>
      <div className={styles.page}>
        <div>
          <h1>
            {"intertx module"}
          </h1>
          <button className={styles.infoButton} onClick={handleShowInfo}>
            {showInfo ? "less info" : "more info"}
          </button>
          <div className={styles.box}>
            {showInfo && <MoreInfo module={intertxModule} />}
            <ul>
              <li>
                <a href="#msg-register-account">
                  {'MsgRegisterAccount'}
                </a>
              </li>
              <li>
                <a href="#msg-submit-tx">
                  {'MsgSubmitTx'}
                </a>
              </li>
              <li>
                <a href="#query-interchain-account">
                  {'QueryInterchainAccount'}
                </a>
              </li>
            </ul>
          </div>
          <MsgRegisterAccount/>
          <MsgSubmitTx/>
          <QueryInterchainAccount/>
        </div>
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default InterTxPage
