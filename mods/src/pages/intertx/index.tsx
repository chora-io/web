import * as React from "react"

import { intertxModule } from "chora/modules"

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
        <div className={styles.box}>
          <p>
            {`specification: `}
            <a href={intertxModule.specification} target="_blank">
              {intertxModule.specification}
            </a>
          </p>
          <p>
            {`api documentation: `}
            <a href={intertxModule.apiDocumentation} target="_blank">
              {intertxModule.apiDocumentation}
            </a>
          </p>
          {intertxModule.apiVersion && (
            <p>
              {`api version: `}
              <a href={intertxModule.apiVersion} target="_blank">
                {intertxModule.apiVersion}
              </a>
            </p>
          )}
          <p>
            {`git repository: `}
            <a href={intertxModule.gitRepository} target="_blank">
              {intertxModule.gitRepository}
            </a>
          </p>
          {intertxModule.gitVersion && (
            <p>
              {`git version: `}
              <a href={intertxModule.gitVersion} target="_blank">
                {intertxModule.gitVersion}
              </a>
            </p>
          )}
          <ul className={styles.boxTable}>
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
        <MsgRegisterAccount />
        <MsgSubmitTx />
        <QueryInterchainAccount />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default InterTxPage
