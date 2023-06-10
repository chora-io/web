import * as React from "react"

import { authzModule } from "chora/modules"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import MsgExec from "../../components/authz/MsgExec"
import MsgGrant from "../../components/authz/MsgGrant"
import MsgRevoke from "../../components/authz/MsgRevoke"
import QueryGranteeGrants from "../../components/authz/QueryGranteeGrants"
import QueryGranterGrants from "../../components/authz/QueryGranterGrants"
import QueryGrants from "../../components/authz/QueryGrants"

import * as styles from "./index.module.css"

const AuthzPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"authz module"}
        </h1>
        <div className={styles.box}>
          <p>
            {`specification: `}
            <a href={authzModule.specification} target="_blank">
              {authzModule.specification}
            </a>
          </p>
          <p>
            {`api documentation: `}
            <a href={authzModule.apiDocumentation} target="_blank">
              {authzModule.apiDocumentation}
            </a>
          </p>
          {authzModule.apiVersion && (
            <p>
              {`api version: `}
              <a href={authzModule.apiVersion} target="_blank">
                {authzModule.apiVersion}
              </a>
            </p>
          )}
          <p>
            {`git repository: `}
            <a href={authzModule.gitRepository} target="_blank">
              {authzModule.gitRepository}
            </a>
          </p>
          {authzModule.gitVersion && (
            <p>
              {`git version: `}
              <a href={authzModule.gitVersion} target="_blank">
                {authzModule.gitVersion}
              </a>
            </p>
          )}
          <ul className={styles.boxTable}>
            <li>
              <a href="#msg-exec">
                {'MsgExec'}
              </a>
            </li>
            <li>
              <a href="#msg-grant">
                {'MsgGrant'}
              </a>
            </li>
            <li>
              <a href="#msg-revoke">
                {'MsgRevoke'}
              </a>
            </li>
            <li>
              <a href="#query-grantee-grants">
                {'QueryGranteeGrants'}
              </a>
            </li>
            <li>
              <a href="#query-granter-grants">
                {'QueryGranterGrants'}
              </a>
            </li>
            <li>
              <a href="#query-grants">
                {'QueryGrants'}
              </a>
            </li>
          </ul>
        </div>
        <MsgExec />
        <MsgGrant />
        <MsgRevoke />
        <QueryGranteeGrants />
        <QueryGranterGrants />
        <QueryGrants />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default AuthzPage
