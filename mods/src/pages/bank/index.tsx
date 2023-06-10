import * as React from "react"

import { bankModule } from "chora/modules"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import MsgSend from "../../components/bank/MsgSend"
import QueryBalance from "../../components/bank/QueryBalance"

import * as styles from "./index.module.css"

const BankPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"bank module"}
        </h1>
        <div className={styles.box}>
          <p>
            {`specification: `}
            <a href={bankModule.specification} target="_blank">
              {bankModule.specification}
            </a>
          </p>
          <p>
            {`api documentation: `}
            <a href={bankModule.apiDocumentation} target="_blank">
              {bankModule.apiDocumentation}
            </a>
          </p>
          {bankModule.apiVersion && (
            <p>
              {`api version: `}
              <a href={bankModule.apiVersion} target="_blank">
                {bankModule.apiVersion}
              </a>
            </p>
          )}
          <p>
            {`git repository: `}
            <a href={bankModule.gitRepository} target="_blank">
              {bankModule.gitRepository}
            </a>
          </p>
          {bankModule.gitVersion && (
            <p>
              {`git version: `}
              <a href={bankModule.gitVersion} target="_blank">
                {bankModule.gitVersion}
              </a>
            </p>
          )}
          <ul className={styles.boxTable}>
            <li>
              <a href="#msg-multi-send">
                {'MsgMultiSend'}
              </a>
            </li>
            <li>
              <a href="#msg-send">
                {'MsgSend'}
              </a>
            </li>
            <li>
              <a href="#msg-set-send-enabled">
                {'MsgSetSendEnabled'}
              </a>
            </li>
            <li>
              <a href="#query-all-balances">
                {'QueryAllBalances'}
              </a>
            </li>
            <li>
              <a href="#query-all-balances">
                {'QueryAllBalances'}
              </a>
            </li>
            <li>
              <a href="#query-denom-metadata">
                {'QueryDenomMetadata'}
              </a>
            </li>
            <li>
              <a href="#query-denom-owners">
                {'QueryDenomOwners'}
              </a>
            </li>
            <li>
              <a href="#query-denoms-metadata">
                {'QueryDenomsMetadata'}
              </a>
            </li>
            <li>
              <a href="#query-denoms-metadata">
                {'QueryDenomsMetadata'}
              </a>
            </li>
            <li>
              <a href="#query-send-enabled">
                {'QuerySendEnabled'}
              </a>
            </li>
            <li>
              <a href="#query-spendable-balance-by-denom">
                {'QuerySpendableBalanceByDenom'}
              </a>
            </li>
            <li>
              <a href="#query-spendable-balances">
                {'QuerySpendableBalances'}
              </a>
            </li>
            <li>
              <a href="#query-supply-of">
                {'QuerySupplyOf'}
              </a>
            </li>
            <li>
              <a href="#query-total-supply">
                {'QueryTotalSupply'}
              </a>
            </li>
          </ul>
        </div>
        <MsgSend />
        <QueryBalance />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default BankPage
