import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import MsgAddAllowedBridgeChain from "../../components/ecocredit/MsgAddAllowedBridgeChain"
import MsgAddClassCreator from "../../components/ecocredit/MsgAddClassCreator"
import MsgAddCreditType from "../../components/ecocredit/MsgAddCreditType"
import MsgBridge from "../../components/ecocredit/MsgBridge"
import MsgBridgeReceive from "../../components/ecocredit/MsgBridgeReceive"
import MsgCancel from "../../components/ecocredit/MsgCancel"
import MsgCreateBatch from "../../components/ecocredit/MsgCreateBatch"
import MsgCreateClass from "../../components/ecocredit/MsgCreateClass"
import MsgCreateProject from "../../components/ecocredit/MsgCreateProject"
import MsgMintBatchCredits from "../../components/ecocredit/MsgMintBatchCredits"
import MsgRemoveAllowedBridgeChain from "../../components/ecocredit/MsgRemoveAllowedBridgeChain"
import MsgRemoveClassCreator from "../../components/ecocredit/MsgRemoveClassCreator"
import MsgRetire from "../../components/ecocredit/MsgRetire"
import MsgSealBatch from "../../components/ecocredit/MsgSealBatch"
import MsgSend from "../../components/ecocredit/MsgSend"
import MsgSetClassCreatorAllowlist from "../../components/ecocredit/MsgSetClassCreatorAllowlist"
import MsgUpdateBatchMetadata from "../../components/ecocredit/MsgUpdateBatchMetadata"
import MsgUpdateClassAdmin from "../../components/ecocredit/MsgUpdateClassAdmin"
import MsgUpdateClassFee from "../../components/ecocredit/MsgUpdateClassFee"
import MsgUpdateClassIssuers from "../../components/ecocredit/MsgUpdateClassIssuers"
import MsgUpdateClassMetadata from "../../components/ecocredit/MsgUpdateClassMetadata"
import MsgUpdateProjectAdmin from "../../components/ecocredit/MsgUpdateProjectAdmin"
import MsgUpdateProjectMetadata from "../../components/ecocredit/MsgUpdateProjectMetadata"
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
            <a href="#msg-add-allowed-bridge-chain">
              {'MsgAddAllowedBridgeChain'}
            </a>
          </li>
          <li>
            <a href="#msg-add-class-creator">
              {'MsgAddClassCreator'}
            </a>
          </li>
          <li>
            <a href="#msg-add-credit-type">
              {'MsgAddCreditType'}
            </a>
          </li>
          <li>
            <a href="#msg-bridge">
              {'MsgBridge'}
            </a>
          </li>
          <li>
            <a href="#msg-bridge-receive">
              {'MsgBridgeReceive'}
            </a>
          </li>
          <li>
            <a href="#msg-cancel">
              {'MsgCancel'}
            </a>
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
            <a href="#msg-mint-batch-credits">
              {'MsgMintBatchCredits'}
            </a>
          </li>
          <li>
            <a href="#msg-remove-allowed-bridge-chain">
              {'MsgRemoveAllowedBridgeChain'}
            </a>
          </li>
          <li>
            <a href="#msg-remove-class-creator">
              {'MsgRemoveClassCreator'}
            </a>
          </li>
          <li>
            <a href="#msg-retire">
              {'MsgRetire'}
            </a>
          </li>
          <li>
            <a href="#msg-seal-batch">
              {'MsgSealBatch'}
            </a>
          </li>
          <li>
            <a href="#msg-send">
              {'MsgSend'}
            </a>
          </li>
          <li>
            <a href="#msg-set-class-creator-allowlist">
              {'MsgSetClassCreatorAllowlist'}
            </a>
          </li>
          <li>
            <a href="#msg-update-batch-metadata">
              {'MsgUpdateBatchMetadata'}
            </a>
          </li>
          <li>
            <a href="#msg-update-class-admin">
              {'MsgUpdateClassAdmin'}
            </a>
          </li>
          <li>
            <a href="#msg-update-class-fee">
              {'MsgUpdateClassFee'}
            </a>
          </li>
          <li>
            <a href="#msg-update-class-issuers">
              {'MsgUpdateClassIssuers'}
            </a>
          </li>
          <li>
            <a href="#msg-update-class-metadata">
              {'MsgUpdateClassMetadata'}
            </a>
          </li>
          <li>
            <a href="#msg-update-project-admin">
              {'MsgUpdateProjectAdmin'}
            </a>
          </li>
          <li>
            <a href="#msg-update-project-metadata">
              {'MsgUpdateProjectMetadata'}
            </a>
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
        <MsgAddAllowedBridgeChain />
        <MsgAddClassCreator />
        <MsgAddCreditType />
        <MsgBridge />
        <MsgBridgeReceive />
        <MsgCancel />
        <MsgCreateBatch />
        <MsgCreateClass />
        <MsgCreateProject />
        <MsgMintBatchCredits />
        <MsgRemoveAllowedBridgeChain />
        <MsgRemoveClassCreator />
        <MsgRetire />
        <MsgSealBatch />
        <MsgSend />
        <MsgSetClassCreatorAllowlist />
        <MsgUpdateBatchMetadata />
        <MsgUpdateClassAdmin />
        <MsgUpdateClassFee />
        <MsgUpdateClassIssuers />
        <MsgUpdateClassMetadata />
        <MsgUpdateProjectAdmin />
        <MsgUpdateProjectMetadata />
        <QueryBatch />
        <QueryClass />
        <QueryProject />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default EcocreditPage
