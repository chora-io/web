import * as React from "react"

import { feegrantModule } from "chora/modules"

import Main from "../../layouts/Main"
import MoreInfo from "../../components/MoreInfo"
import Seo from "../../components/SeoWrapper"

import MsgGrantAllowance from "../../components/feegrant/MsgGrantAllowance"
import MsgRevokeAllowance from "../../components/feegrant/MsgRevokeAllowance"
import QueryAllowance from "../../components/feegrant/QueryAllowance"

import * as styles from "./index.module.css"

const FeegrantPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"feegrant module"}
        </h1>
        <div className={styles.box}>
          <MoreInfo
            module={feegrantModule}
          />
          <ul className={styles.boxTable}>
            <li>
              <a href="#msg-grant-allowance">
                {'MsgGrantAllowance'}
              </a>
            </li>
            <li>
              <a href="#msg-revoke-allowance">
                {'MsgRevokeAllowance'}
              </a>
            </li>
            <li>
              <a href="#query-allowance">
                {'QueryAllowance'}
              </a>
            </li>
            <li>
              <a href="#query-allowances">
                {'QueryAllowances'}
              </a>
            </li>
            <li>
              <a href="#query-allowances-by-granter">
                {'QueryAllowancesByGranter'}
              </a>
            </li>
          </ul>
        </div>
        <MsgGrantAllowance />
        <MsgRevokeAllowance />
        <QueryAllowance />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default FeegrantPage
