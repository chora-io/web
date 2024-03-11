import { Metadata } from 'next'

import ModuleInfo from '@components/modules/ecocredit/ModuleInfo'
import MsgAddAllowedBridgeChain from '@components/modules/ecocredit/MsgAddAllowedBridgeChain'
import MsgAddClassCreator from '@components/modules/ecocredit/MsgAddClassCreator'
import MsgAddCreditType from '@components/modules/ecocredit/MsgAddCreditType'
import MsgBridge from '@components/modules/ecocredit/MsgBridge'
import MsgBridgeReceive from '@components/modules/ecocredit/MsgBridgeReceive'
import MsgCancel from '@components/modules/ecocredit/MsgCancel'
import MsgCreateBatch from '@components/modules/ecocredit/MsgCreateBatch'
import MsgCreateClass from '@components/modules/ecocredit/MsgCreateClass'
import MsgCreateProject from '@components/modules/ecocredit/MsgCreateProject'
import MsgMintBatchCredits from '@components/modules/ecocredit/MsgMintBatchCredits'
import MsgRemoveAllowedBridgeChain from '@components/modules/ecocredit/MsgRemoveAllowedBridgeChain'
import MsgRemoveClassCreator from '@components/modules/ecocredit/MsgRemoveClassCreator'
import MsgRetire from '@components/modules/ecocredit/MsgRetire'
import MsgSealBatch from '@components/modules/ecocredit/MsgSealBatch'
import MsgSend from '@components/modules/ecocredit/MsgSend'
import MsgSetClassCreatorAllowlist from '@components/modules/ecocredit/MsgSetClassCreatorAllowlist'
import MsgUpdateBatchMetadata from '@components/modules/ecocredit/MsgUpdateBatchMetadata'
import MsgUpdateClassAdmin from '@components/modules/ecocredit/MsgUpdateClassAdmin'
import MsgUpdateClassFee from '@components/modules/ecocredit/MsgUpdateClassFee'
import MsgUpdateClassIssuers from '@components/modules/ecocredit/MsgUpdateClassIssuers'
import MsgUpdateClassMetadata from '@components/modules/ecocredit/MsgUpdateClassMetadata'
import MsgUpdateProjectAdmin from '@components/modules/ecocredit/MsgUpdateProjectAdmin'
import MsgUpdateProjectMetadata from '@components/modules/ecocredit/MsgUpdateProjectMetadata'
import QueryAllBalances from '@components/modules/ecocredit/QueryAllBalances'
import QueryAllowedBridgeChains from '@components/modules/ecocredit/QueryAllowedBridgeChains'
import QueryAllowedClassCreators from '@components/modules/ecocredit/QueryAllowedClassCreators'
import QueryBalance from '@components/modules/ecocredit/QueryBalance'
import QueryBalances from '@components/modules/ecocredit/QueryBalances'
import QueryBalancesByBatch from '@components/modules/ecocredit/QueryBalancesByBatch'
import QueryBatch from '@components/modules/ecocredit/QueryBatch'
import QueryBatches from '@components/modules/ecocredit/QueryBatches'
import QueryBatchesByClass from '@components/modules/ecocredit/QueryBatchesByClass'
import QueryBatchesByIssuer from '@components/modules/ecocredit/QueryBatchesByIssuer'
import QueryBatchesByProject from '@components/modules/ecocredit/QueryBatchesByProject'
import QueryClass from '@components/modules/ecocredit/QueryClass'
import QueryClassCreatorAllowlist from '@components/modules/ecocredit/QueryClassCreatorAllowlist'
import QueryClasses from '@components/modules/ecocredit/QueryClasses'
import QueryClassesByAdmin from '@components/modules/ecocredit/QueryClassesByAdmin'
import QueryClassFee from '@components/modules/ecocredit/QueryClassFee'
import QueryClassIssuers from '@components/modules/ecocredit/QueryClassIssuers'
import QueryCreditType from '@components/modules/ecocredit/QueryCreditType'
import QueryCreditTypes from '@components/modules/ecocredit/QueryCreditTypes'
import QueryParams from '@components/modules/ecocredit/QueryParams'
import QueryProject from '@components/modules/ecocredit/QueryProject'
import QueryProjects from '@components/modules/ecocredit/QueryProjects'
import QueryProjectsByAdmin from '@components/modules/ecocredit/QueryProjectsByAdmin'
import QueryProjectsByClass from '@components/modules/ecocredit/QueryProjectsByClass'
import QueryProjectsByReferenceId from '@components/modules/ecocredit/QueryProjectsByReferenceId'
import QuerySupply from '@components/modules/ecocredit/QuerySupply'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const EcocreditPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'ecocredit module'}</h1>
      <ModuleInfo />
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
      <QueryAllBalances />
      <QueryAllowedBridgeChains />
      <QueryAllowedClassCreators />
      <QueryBalance />
      <QueryBalances />
      <QueryBalancesByBatch />
      <QueryBatch />
      <QueryBatches />
      <QueryBatchesByClass />
      <QueryBatchesByIssuer />
      <QueryBatchesByProject />
      <QueryClass />
      <QueryClassCreatorAllowlist />
      <QueryClasses />
      <QueryClassesByAdmin />
      <QueryClassFee />
      <QueryClassIssuers />
      <QueryCreditType />
      <QueryCreditTypes />
      <QueryParams />
      <QueryProject />
      <QueryProjects />
      <QueryProjectsByAdmin />
      <QueryProjectsByClass />
      <QueryProjectsByReferenceId />
      <QuerySupply />
    </div>
  </div>
)

export default EcocreditPage
