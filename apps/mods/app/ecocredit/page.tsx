'use client'

// import { Metadata } from 'next'
import { useState } from "react"

import { ecocreditModule } from "chora/modules"

import MoreInfo from "@components/MoreInfo"
import MsgAddAllowedBridgeChain from "@components/ecocredit/MsgAddAllowedBridgeChain"
import MsgAddClassCreator from "@components/ecocredit/MsgAddClassCreator"
import MsgAddCreditType from "@components/ecocredit/MsgAddCreditType"
import MsgBridge from "@components/ecocredit/MsgBridge"
import MsgBridgeReceive from "@components/ecocredit/MsgBridgeReceive"
import MsgCancel from "@components/ecocredit/MsgCancel"
import MsgCreateBatch from "@components/ecocredit/MsgCreateBatch"
import MsgCreateClass from "@components/ecocredit/MsgCreateClass"
import MsgCreateProject from "@components/ecocredit/MsgCreateProject"
import MsgMintBatchCredits from "@components/ecocredit/MsgMintBatchCredits"
import MsgRemoveAllowedBridgeChain from "@components/ecocredit/MsgRemoveAllowedBridgeChain"
import MsgRemoveClassCreator from "@components/ecocredit/MsgRemoveClassCreator"
import MsgRetire from "@components/ecocredit/MsgRetire"
import MsgSealBatch from "@components/ecocredit/MsgSealBatch"
import MsgSend from "@components/ecocredit/MsgSend"
import MsgSetClassCreatorAllowlist from "@components/ecocredit/MsgSetClassCreatorAllowlist"
import MsgUpdateBatchMetadata from "@components/ecocredit/MsgUpdateBatchMetadata"
import MsgUpdateClassAdmin from "@components/ecocredit/MsgUpdateClassAdmin"
import MsgUpdateClassFee from "@components/ecocredit/MsgUpdateClassFee"
import MsgUpdateClassIssuers from "@components/ecocredit/MsgUpdateClassIssuers"
import MsgUpdateClassMetadata from "@components/ecocredit/MsgUpdateClassMetadata"
import MsgUpdateProjectAdmin from "@components/ecocredit/MsgUpdateProjectAdmin"
import MsgUpdateProjectMetadata from "@components/ecocredit/MsgUpdateProjectMetadata"
import QueryAllBalances from "@components/ecocredit/QueryAllBalances"
import QueryAllowedBridgeChains from "@components/ecocredit/QueryAllowedBridgeChains"
import QueryAllowedClassCreators from "@components/ecocredit/QueryAllowedClassCreators"
import QueryBalance from "@components/ecocredit/QueryBalance"
import QueryBalances from "@components/ecocredit/QueryBalances"
import QueryBalancesByBatch from "@components/ecocredit/QueryBalancesByBatch"
import QueryBatch from "@components/ecocredit/QueryBatch"
import QueryBatches from "@components/ecocredit/QueryBatches"
import QueryBatchesByClass from "@components/ecocredit/QueryBatchesByClass"
import QueryBatchesByIssuer from "@components/ecocredit/QueryBatchesByIssuer"
import QueryBatchesByProject from "@components/ecocredit/QueryBatchesByProject"
import QueryClass from "@components/ecocredit/QueryClass"
import QueryClassCreatorAllowlist from "@components/ecocredit/QueryClassCreatorAllowlist"
import QueryClasses from "@components/ecocredit/QueryClasses"
import QueryClassesByAdmin from "@components/ecocredit/QueryClassesByAdmin"
import QueryClassFee from "@components/ecocredit/QueryClassFee"
import QueryClassIssuers from "@components/ecocredit/QueryClassIssuers"
import QueryCreditType from "@components/ecocredit/QueryCreditType"
import QueryCreditTypes from "@components/ecocredit/QueryCreditTypes"
import QueryParams from "@components/ecocredit/QueryParams"
import QueryProject from "@components/ecocredit/QueryProject"
import QueryProjects from "@components/ecocredit/QueryProjects"
import QueryProjectsByAdmin from "@components/ecocredit/QueryProjectsByAdmin"
import QueryProjectsByClass from "@components/ecocredit/QueryProjectsByClass"
import QueryProjectsByReferenceId from "@components/ecocredit/QueryProjectsByReferenceId"
import QuerySupply from "@components/ecocredit/QuerySupply"

import styles from "./page.module.css"

// export const metadata: Metadata = {
//   title: 'ecocredit',
// }

const EcocreditPage = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false)

  const handleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <div className={styles.page}>
      <div>
        <h1>
          {"ecocredit module"}
        </h1>
        <button className={styles.infoButton} onClick={handleShowInfo}>
          {showInfo ? "less info" : "more info"}
        </button>
        <div className={styles.box}>
          {showInfo && <MoreInfo module={ecocreditModule} />}
          <ul>
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
              <a href="#query-all-balances">
                {'QueryAllBalances'}
              </a>
            </li>
            <li>
              <a href="#query-allowed-bridge-chains">
                {'QueryAllowedBridgeChains'}
              </a>
            </li>
            <li>
              <a href="#query-allowed-bridge-chains">
                {'QueryAllowedClassCreators'}
              </a>
            </li>
            <li>
              <a href="#query-balance">
                {'QueryBalance'}
              </a>
            </li>
            <li>
              <a href="#query-balances">
                {'QueryBalances'}
              </a>
            </li>
            <li>
              <a href="#query-balances-by-batch">
                {'QueryBalancesByBatch'}
              </a>
            </li>
            <li>
              <a href="#query-batch">
                {'QueryBatch'}
              </a>
            </li>
            <li>
              <a href="#query-batches">
                {'QueryBatches'}
              </a>
            </li>
            <li>
              <a href="#query-batches-by-class">
                {'QueryBatchesByClass'}
              </a>
            </li>
            <li>
              <a href="#query-batches-by-issuer">
                {'QueryBatchesByIssuer'}
              </a>
            </li>
            <li>
              <a href="#query-batches-by-project">
                {'QueryBatchesByProject'}
              </a>
            </li>
            <li>
              <a href="#query-class">
                {'QueryClass'}
              </a>
            </li>
            <li>
              <a href="#query-class-creator-allowlist">
                {'QueryClassCreatorAllowlist'}
              </a>
            </li>
            <li>
              <a href="#query-classes">
                {'QueryClasses'}
              </a>
            </li>
            <li>
              <a href="#query-classes-by-admin">
                {'QueryClassesByAdmin'}
              </a>
            </li>
            <li>
              <a href="#query-class-fee">
                {'QueryClassFee'}
              </a>
            </li>
            <li>
              <a href="#query-class-issuers">
                {'QueryClassIssuers'}
              </a>
            </li>
            <li>
              <a href="#query-credit-type">
                {'QueryCreditType'}
              </a>
            </li>
            <li>
              <a href="#query-credit-types">
                {'QueryCreditTypes'}
              </a>
            </li>
            <li>
              <a href="#query-params">
                {'QueryParams'}
              </a>
            </li>
            <li>
              <a href="#query-project">
                {'QueryProject'}
              </a>
            </li>
            <li>
              <a href="#query-projects">
                {'QueryProjects'}
              </a>
            </li>
            <li>
              <a href="#query-projects-by-admin">
                {'QueryProjectsByAdmin'}
              </a>
            </li>
            <li>
              <a href="#query-projects-by-class">
                {'QueryProjectsByClass'}
              </a>
            </li>
            <li>
              <a href="#query-projects-by-reference-id">
                {'QueryProjectsByReferenceId'}
              </a>
            </li>
            <li>
              <a href="#query-supply">
                {'QuerySupply'}
              </a>
            </li>
          </ul>
        </div>
        <MsgAddAllowedBridgeChain/>
        <MsgAddClassCreator/>
        <MsgAddCreditType/>
        <MsgBridge/>
        <MsgBridgeReceive/>
        <MsgCancel/>
        <MsgCreateBatch/>
        <MsgCreateClass/>
        <MsgCreateProject/>
        <MsgMintBatchCredits/>
        <MsgRemoveAllowedBridgeChain/>
        <MsgRemoveClassCreator/>
        <MsgRetire/>
        <MsgSealBatch/>
        <MsgSend/>
        <MsgSetClassCreatorAllowlist/>
        <MsgUpdateBatchMetadata/>
        <MsgUpdateClassAdmin/>
        <MsgUpdateClassFee/>
        <MsgUpdateClassIssuers/>
        <MsgUpdateClassMetadata/>
        <MsgUpdateProjectAdmin/>
        <MsgUpdateProjectMetadata/>
        <QueryAllBalances/>
        <QueryAllowedBridgeChains/>
        <QueryAllowedClassCreators/>
        <QueryBalance/>
        <QueryBalances/>
        <QueryBalancesByBatch/>
        <QueryBatch/>
        <QueryBatches/>
        <QueryBatchesByClass/>
        <QueryBatchesByIssuer/>
        <QueryBatchesByProject/>
        <QueryClass/>
        <QueryClassCreatorAllowlist/>
        <QueryClasses/>
        <QueryClassesByAdmin/>
        <QueryClassFee/>
        <QueryClassIssuers/>
        <QueryCreditType/>
        <QueryCreditTypes/>
        <QueryParams/>
        <QueryProject/>
        <QueryProjects/>
        <QueryProjectsByAdmin/>
        <QueryProjectsByClass/>
        <QueryProjectsByReferenceId/>
        <QuerySupply/>
      </div>
    </div>
  )
}

export default EcocreditPage
