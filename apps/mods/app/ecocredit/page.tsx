import { Metadata } from 'next'

import ModuleInfo from '@components/ecocredit/ModuleInfo'
import MsgAddAllowedBridgeChain from '@components/ecocredit/MsgAddAllowedBridgeChain'
import MsgAddClassCreator from '@components/ecocredit/MsgAddClassCreator'
import MsgAddCreditType from '@components/ecocredit/MsgAddCreditType'
import MsgBridge from '@components/ecocredit/MsgBridge'
import MsgBridgeReceive from '@components/ecocredit/MsgBridgeReceive'
import MsgCancel from '@components/ecocredit/MsgCancel'
import MsgCreateBatch from '@components/ecocredit/MsgCreateBatch'
import MsgCreateClass from '@components/ecocredit/MsgCreateClass'
import MsgCreateProject from '@components/ecocredit/MsgCreateProject'
import MsgMintBatchCredits from '@components/ecocredit/MsgMintBatchCredits'
import MsgRemoveAllowedBridgeChain from '@components/ecocredit/MsgRemoveAllowedBridgeChain'
import MsgRemoveClassCreator from '@components/ecocredit/MsgRemoveClassCreator'
import MsgRetire from '@components/ecocredit/MsgRetire'
import MsgSealBatch from '@components/ecocredit/MsgSealBatch'
import MsgSend from '@components/ecocredit/MsgSend'
import MsgSetClassCreatorAllowlist from '@components/ecocredit/MsgSetClassCreatorAllowlist'
import MsgUpdateBatchMetadata from '@components/ecocredit/MsgUpdateBatchMetadata'
import MsgUpdateClassAdmin from '@components/ecocredit/MsgUpdateClassAdmin'
import MsgUpdateClassFee from '@components/ecocredit/MsgUpdateClassFee'
import MsgUpdateClassIssuers from '@components/ecocredit/MsgUpdateClassIssuers'
import MsgUpdateClassMetadata from '@components/ecocredit/MsgUpdateClassMetadata'
import MsgUpdateProjectAdmin from '@components/ecocredit/MsgUpdateProjectAdmin'
import MsgUpdateProjectMetadata from '@components/ecocredit/MsgUpdateProjectMetadata'
import QueryAllBalances from '@components/ecocredit/QueryAllBalances'
import QueryAllowedBridgeChains from '@components/ecocredit/QueryAllowedBridgeChains'
import QueryAllowedClassCreators from '@components/ecocredit/QueryAllowedClassCreators'
import QueryBalance from '@components/ecocredit/QueryBalance'
import QueryBalances from '@components/ecocredit/QueryBalances'
import QueryBalancesByBatch from '@components/ecocredit/QueryBalancesByBatch'
import QueryBatch from '@components/ecocredit/QueryBatch'
import QueryBatches from '@components/ecocredit/QueryBatches'
import QueryBatchesByClass from '@components/ecocredit/QueryBatchesByClass'
import QueryBatchesByIssuer from '@components/ecocredit/QueryBatchesByIssuer'
import QueryBatchesByProject from '@components/ecocredit/QueryBatchesByProject'
import QueryClass from '@components/ecocredit/QueryClass'
import QueryClassCreatorAllowlist from '@components/ecocredit/QueryClassCreatorAllowlist'
import QueryClasses from '@components/ecocredit/QueryClasses'
import QueryClassesByAdmin from '@components/ecocredit/QueryClassesByAdmin'
import QueryClassFee from '@components/ecocredit/QueryClassFee'
import QueryClassIssuers from '@components/ecocredit/QueryClassIssuers'
import QueryCreditType from '@components/ecocredit/QueryCreditType'
import QueryCreditTypes from '@components/ecocredit/QueryCreditTypes'
import QueryParams from '@components/ecocredit/QueryParams'
import QueryProject from '@components/ecocredit/QueryProject'
import QueryProjects from '@components/ecocredit/QueryProjects'
import QueryProjectsByAdmin from '@components/ecocredit/QueryProjectsByAdmin'
import QueryProjectsByClass from '@components/ecocredit/QueryProjectsByClass'
import QueryProjectsByReferenceId from '@components/ecocredit/QueryProjectsByReferenceId'
import QuerySupply from '@components/ecocredit/QuerySupply'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'mods | ecocredit',
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
