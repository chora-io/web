import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import MsgCreateBatch from "../../components/ecocredit/MsgCreateBatch"
import MsgCreateClass from "../../components/ecocredit/MsgCreateClass"
import MsgCreateProject from "../../components/ecocredit/MsgCreateProject"
import QueryBatch from "../../components/ecocredit/QueryBatch"
import QueryClass from "../../components/ecocredit/QueryClass"
import QueryProject from "../../components/ecocredit/QueryProject"

import * as styles from "./index.module.css"

const EcocreditPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"ecocredit module"}
        </h1>
        <ul className={styles.table}>
          <li>
            {'MsgAddAllowedBridgeChain'}
          </li>
          <li>
            {'MsgAddClassCreator'}
          </li>
          <li>
            {'MsgAddCreditType'}
          </li>
          <li>
            {'MsgBridge'}
          </li>
          <li>
            {'MsgBridgeReceive'}
          </li>
          <li>
            {'MsgCancel'}
          </li>
          <li>
            <a href="#msg-create-batch">
              {'MsgCreateBatch'}
            </a>
          </li>
          <li>
            <a href="#msg-create-class">
              {'MsgCreateClass'}
            </a>
          </li>
          <li>
            <a href="#msg-create-project">
              {'MsgCreateProject'}
            </a>
          </li>
          <li>
            {'MsgMintBatchCredits'}
          </li>
          <li>
            {'MsgRemoveAllowedBridgeChain'}
          </li>
          <li>
            {'MsgRemoveClassCreator'}
          </li>
          <li>
            {'MsgRetire'}
          </li>
          <li>
            {'MsgSealBatch'}
          </li>
          <li>
            {'MsgSend'}
          </li>
          <li>
            {'MsgSetClassCreatorAllowlist'}
          </li>
          <li>
            {'MsgUpdateBatchMetadata'}
          </li>
          <li>
            {'MsgUpdateClassAdmin'}
          </li>
          <li>
            {'MsgUpdateClassFee'}
          </li>
          <li>
            {'MsgUpdateClassIssuers'}
          </li>
          <li>
            {'MsgUpdateClassMetadata'}
          </li>
          <li>
            {'MsgUpdateProjectAdmin'}
          </li>
          <li>
            {'MsgUpdateProjectMetadata'}
          </li>
          <li>
            {'QueryAllBalances'}
          </li>
          <li>
            {'QueryAllowedBridgeChains'}
          </li>
          <li>
            {'QueryAllowedClassCreators'}
          </li>
          <li>
            {'QueryBalance'}
          </li>
          <li>
            {'QueryBalances'}
          </li>
          <li>
            {'QueryBalancesByBatch'}
          </li>
          <li>
            <a href="#query-batch">
              {'QueryBatch'}
            </a>
          </li>
          <li>
            {'QueryBatches'}
          </li>
          <li>
            {'QueryBatchesByClass'}
          </li>
          <li>
            {'QueryBatchesByIssuer'}
          </li>
          <li>
            {'QueryBatchesByProject'}
          </li>
          <li>
            <a href="#query-class">
              {'QueryClass'}
            </a>
          </li>
          <li>
            {'QueryClassCreatorAllowlist'}
          </li>
          <li>
            {'QueryClasses'}
          </li>
          <li>
            {'QueryClassesByAdmin'}
          </li>
          <li>
            {'QueryClassFee'}
          </li>
          <li>
            {'QueryClassIssuers'}
          </li>
          <li>
            {'QueryCreditType'}
          </li>
          <li>
            {'QueryCreditTypes'}
          </li>
          <li>
            {'QueryParams'}
          </li>
          <li>
            <a href="#query-project">
              {'QueryProject'}
            </a>
          </li>
          <li>
            {'QueryProjects'}
          </li>
          <li>
            {'QueryProjectsByAdmin'}
          </li>
          <li>
            {'QueryProjectsByClass'}
          </li>
          <li>
            {'QueryProjectsByReferenceId'}
          </li>
          <li>
            {'QuerySupply'}
          </li>
        </ul>
        <MsgCreateBatch />
        <MsgCreateClass />
        <MsgCreateProject />
        <QueryBatch />
        <QueryClass />
        <QueryProject />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default EcocreditPage
