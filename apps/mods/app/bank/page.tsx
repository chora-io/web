'use client'

// import { Metadata } from 'next'
import { useState } from 'react'

import { bankModule } from 'chora/modules'

import MoreInfo from '@components/MoreInfo'
import MsgMultiSend from '@components/bank/MsgMultiSend'
import MsgSend from '@components/bank/MsgSend'
import MsgSetSendEnabled from '@components/bank/MsgSetSendEnabled'
import QueryAllBalances from '@components/bank/QueryAllBalances'
import QueryBalance from '@components/bank/QueryBalance'

import styles from './page.module.css'

// export const metadata: Metadata = {
//   title: 'bank',
// }

const BankPage = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false)

  const handleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <div className={styles.page}>
      <div>
        <h1>{'bank module'}</h1>
        <button className={styles.infoButton} onClick={handleShowInfo}>
          {showInfo ? 'less info' : 'more info'}
        </button>
        <div className={styles.box}>
          {showInfo && <MoreInfo module={bankModule} />}
          <ul>
            <li>
              <a href="#msg-multi-send">{'MsgMultiSend'}</a>
            </li>
            <li>
              <a href="#msg-send">{'MsgSend'}</a>
            </li>
            <li>
              <a href="#msg-set-send-enabled">{'MsgSetSendEnabled'}</a>
            </li>
            <li>
              <a href="#query-all-balances">{'QueryAllBalances'}</a>
            </li>
            <li>
              <a href="#query-balance">{'QueryBalance'}</a>
            </li>
            <li>
              <a href="#query-denom-metadata">{'QueryDenomMetadata'}</a>
            </li>
            <li>
              <a href="#query-denom-owners">{'QueryDenomOwners'}</a>
            </li>
            <li>
              <a href="#query-denoms-metadata">{'QueryDenomsMetadata'}</a>
            </li>
            <li>
              <a href="#query-denoms-metadata">{'QueryDenomsMetadata'}</a>
            </li>
            <li>
              <a href="#query-send-enabled">{'QuerySendEnabled'}</a>
            </li>
            <li>
              <a href="#query-spendable-balance-by-denom">
                {'QuerySpendableBalanceByDenom'}
              </a>
            </li>
            <li>
              <a href="#query-spendable-balances">{'QuerySpendableBalances'}</a>
            </li>
            <li>
              <a href="#query-supply-of">{'QuerySupplyOf'}</a>
            </li>
            <li>
              <a href="#query-total-supply">{'QueryTotalSupply'}</a>
            </li>
          </ul>
        </div>
        <MsgMultiSend />
        <MsgSend />
        <MsgSetSendEnabled />
        <QueryAllBalances />
        <QueryBalance />
      </div>
    </div>
  )
}

export default BankPage
