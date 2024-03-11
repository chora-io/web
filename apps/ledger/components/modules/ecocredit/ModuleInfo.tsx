'use client'

import { ecocreditModule } from 'cosmos/modules'
import { useState } from 'react'

import MoreInfo from '@components/modules/MoreInfo'

import styles from './ModuleInfo.module.css'

const ModuleInfo = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false)

  const handleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <>
      <button className={styles.infoButton} onClick={handleShowInfo}>
        {showInfo ? 'less info' : 'more info'}
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
            <a href="#msg-add-class-creator">{'MsgAddClassCreator'}</a>
          </li>
          <li>
            <a href="#msg-add-credit-type">{'MsgAddCreditType'}</a>
          </li>
          <li>
            <a href="#msg-bridge">{'MsgBridge'}</a>
          </li>
          <li>
            <a href="#msg-bridge-receive">{'MsgBridgeReceive'}</a>
          </li>
          <li>
            <a href="#msg-cancel">{'MsgCancel'}</a>
          </li>
          <li>
            <a href="#msg-create-batch">{'MsgCreateBatch'}</a>
          </li>
          <li>
            <a href="#msg-create-class">{'MsgCreateClass'}</a>
          </li>
          <li>
            <a href="#msg-create-project">{'MsgCreateProject'}</a>
          </li>
          <li>
            <a href="#msg-mint-batch-credits">{'MsgMintBatchCredits'}</a>
          </li>
          <li>
            <a href="#msg-remove-allowed-bridge-chain">
              {'MsgRemoveAllowedBridgeChain'}
            </a>
          </li>
          <li>
            <a href="#msg-remove-class-creator">{'MsgRemoveClassCreator'}</a>
          </li>
          <li>
            <a href="#msg-retire">{'MsgRetire'}</a>
          </li>
          <li>
            <a href="#msg-seal-batch">{'MsgSealBatch'}</a>
          </li>
          <li>
            <a href="#msg-send">{'MsgSend'}</a>
          </li>
          <li>
            <a href="#msg-set-class-creator-allowlist">
              {'MsgSetClassCreatorAllowlist'}
            </a>
          </li>
          <li>
            <a href="#msg-update-batch-metadata">{'MsgUpdateBatchMetadata'}</a>
          </li>
          <li>
            <a href="#msg-update-class-admin">{'MsgUpdateClassAdmin'}</a>
          </li>
          <li>
            <a href="#msg-update-class-fee">{'MsgUpdateClassFee'}</a>
          </li>
          <li>
            <a href="#msg-update-class-issuers">{'MsgUpdateClassIssuers'}</a>
          </li>
          <li>
            <a href="#msg-update-class-metadata">{'MsgUpdateClassMetadata'}</a>
          </li>
          <li>
            <a href="#msg-update-project-admin">{'MsgUpdateProjectAdmin'}</a>
          </li>
          <li>
            <a href="#msg-update-project-metadata">
              {'MsgUpdateProjectMetadata'}
            </a>
          </li>
          <li>
            <a href="#query-all-balances">{'QueryAllBalances'}</a>
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
            <a href="#query-balance">{'QueryBalance'}</a>
          </li>
          <li>
            <a href="#query-balances">{'QueryBalances'}</a>
          </li>
          <li>
            <a href="#query-balances-by-batch">{'QueryBalancesByBatch'}</a>
          </li>
          <li>
            <a href="#query-batch">{'QueryBatch'}</a>
          </li>
          <li>
            <a href="#query-batches">{'QueryBatches'}</a>
          </li>
          <li>
            <a href="#query-batches-by-class">{'QueryBatchesByClass'}</a>
          </li>
          <li>
            <a href="#query-batches-by-issuer">{'QueryBatchesByIssuer'}</a>
          </li>
          <li>
            <a href="#query-batches-by-project">{'QueryBatchesByProject'}</a>
          </li>
          <li>
            <a href="#query-class">{'QueryClass'}</a>
          </li>
          <li>
            <a href="#query-class-creator-allowlist">
              {'QueryClassCreatorAllowlist'}
            </a>
          </li>
          <li>
            <a href="#query-classes">{'QueryClasses'}</a>
          </li>
          <li>
            <a href="#query-classes-by-admin">{'QueryClassesByAdmin'}</a>
          </li>
          <li>
            <a href="#query-class-fee">{'QueryClassFee'}</a>
          </li>
          <li>
            <a href="#query-class-issuers">{'QueryClassIssuers'}</a>
          </li>
          <li>
            <a href="#query-credit-type">{'QueryCreditType'}</a>
          </li>
          <li>
            <a href="#query-credit-types">{'QueryCreditTypes'}</a>
          </li>
          <li>
            <a href="#query-params">{'QueryParams'}</a>
          </li>
          <li>
            <a href="#query-project">{'QueryProject'}</a>
          </li>
          <li>
            <a href="#query-projects">{'QueryProjects'}</a>
          </li>
          <li>
            <a href="#query-projects-by-admin">{'QueryProjectsByAdmin'}</a>
          </li>
          <li>
            <a href="#query-projects-by-class">{'QueryProjectsByClass'}</a>
          </li>
          <li>
            <a href="#query-projects-by-reference-id">
              {'QueryProjectsByReferenceId'}
            </a>
          </li>
          <li>
            <a href="#query-supply">{'QuerySupply'}</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
