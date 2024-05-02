import { Metadata } from 'next'

import ModuleInfo from '@components/modules/regen.ecocredit.v1/ModuleInfo'
import MsgAddAllowedBridgeChain from '@components/modules/regen.ecocredit.v1/MsgAddAllowedBridgeChain'
import MsgAddClassCreator from '@components/modules/regen.ecocredit.v1/MsgAddClassCreator'
import MsgAddCreditType from '@components/modules/regen.ecocredit.v1/MsgAddCreditType'
import MsgBridge from '@components/modules/regen.ecocredit.v1/MsgBridge'
import MsgBridgeReceive from '@components/modules/regen.ecocredit.v1/MsgBridgeReceive'
import MsgCancel from '@components/modules/regen.ecocredit.v1/MsgCancel'
import MsgCreateBatch from '@components/modules/regen.ecocredit.v1/MsgCreateBatch'
import MsgCreateClass from '@components/modules/regen.ecocredit.v1/MsgCreateClass'
import MsgCreateProject from '@components/modules/regen.ecocredit.v1/MsgCreateProject'
import MsgMintBatchCredits from '@components/modules/regen.ecocredit.v1/MsgMintBatchCredits'
import MsgRemoveAllowedBridgeChain from '@components/modules/regen.ecocredit.v1/MsgRemoveAllowedBridgeChain'
import MsgRemoveClassCreator from '@components/modules/regen.ecocredit.v1/MsgRemoveClassCreator'
import MsgRetire from '@components/modules/regen.ecocredit.v1/MsgRetire'
import MsgSealBatch from '@components/modules/regen.ecocredit.v1/MsgSealBatch'
import MsgSend from '@components/modules/regen.ecocredit.v1/MsgSend'
import MsgSetClassCreatorAllowlist from '@components/modules/regen.ecocredit.v1/MsgSetClassCreatorAllowlist'
import MsgUpdateBatchMetadata from '@components/modules/regen.ecocredit.v1/MsgUpdateBatchMetadata'
import MsgUpdateClassAdmin from '@components/modules/regen.ecocredit.v1/MsgUpdateClassAdmin'
import MsgUpdateClassFee from '@components/modules/regen.ecocredit.v1/MsgUpdateClassFee'
import MsgUpdateClassIssuers from '@components/modules/regen.ecocredit.v1/MsgUpdateClassIssuers'
import MsgUpdateClassMetadata from '@components/modules/regen.ecocredit.v1/MsgUpdateClassMetadata'
import MsgUpdateProjectAdmin from '@components/modules/regen.ecocredit.v1/MsgUpdateProjectAdmin'
import MsgUpdateProjectMetadata from '@components/modules/regen.ecocredit.v1/MsgUpdateProjectMetadata'
import QueryAllBalances from '@components/modules/regen.ecocredit.v1/QueryAllBalances'
import QueryAllowedBridgeChains from '@components/modules/regen.ecocredit.v1/QueryAllowedBridgeChains'
import QueryAllowedClassCreators from '@components/modules/regen.ecocredit.v1/QueryAllowedClassCreators'
import QueryBalance from '@components/modules/regen.ecocredit.v1/QueryBalance'
import QueryBalances from '@components/modules/regen.ecocredit.v1/QueryBalances'
import QueryBalancesByBatch from '@components/modules/regen.ecocredit.v1/QueryBalancesByBatch'
import QueryBatch from '@components/modules/regen.ecocredit.v1/QueryBatch'
import QueryBatches from '@components/modules/regen.ecocredit.v1/QueryBatches'
import QueryBatchesByClass from '@components/modules/regen.ecocredit.v1/QueryBatchesByClass'
import QueryBatchesByIssuer from '@components/modules/regen.ecocredit.v1/QueryBatchesByIssuer'
import QueryBatchesByProject from '@components/modules/regen.ecocredit.v1/QueryBatchesByProject'
import QueryClass from '@components/modules/regen.ecocredit.v1/QueryClass'
import QueryClassCreatorAllowlist from '@components/modules/regen.ecocredit.v1/QueryClassCreatorAllowlist'
import QueryClasses from '@components/modules/regen.ecocredit.v1/QueryClasses'
import QueryClassesByAdmin from '@components/modules/regen.ecocredit.v1/QueryClassesByAdmin'
import QueryClassFee from '@components/modules/regen.ecocredit.v1/QueryClassFee'
import QueryClassIssuers from '@components/modules/regen.ecocredit.v1/QueryClassIssuers'
import QueryCreditType from '@components/modules/regen.ecocredit.v1/QueryCreditType'
import QueryCreditTypes from '@components/modules/regen.ecocredit.v1/QueryCreditTypes'
import QueryParams from '@components/modules/regen.ecocredit.v1/QueryParams'
import QueryProject from '@components/modules/regen.ecocredit.v1/QueryProject'
import QueryProjects from '@components/modules/regen.ecocredit.v1/QueryProjects'
import QueryProjectsByAdmin from '@components/modules/regen.ecocredit.v1/QueryProjectsByAdmin'
import QueryProjectsByClass from '@components/modules/regen.ecocredit.v1/QueryProjectsByClass'
import QueryProjectsByReferenceId from '@components/modules/regen.ecocredit.v1/QueryProjectsByReferenceId'
import QuerySupply from '@components/modules/regen.ecocredit.v1/QuerySupply'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const ModulePage = () => (
  <div className={styles.page}>
    <h1>{'regen.ecocredit.v1'}</h1>
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
)

export default ModulePage
