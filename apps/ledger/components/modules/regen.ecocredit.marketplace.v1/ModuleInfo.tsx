'use client'

import { regenEcocreditMarketplaceV1 } from 'cosmos/modules'
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
        {showInfo && <MoreInfo module={regenEcocreditMarketplaceV1} />}
        <ul>
          <li className={styles.inactive}>
            <a href="#msg-add-allowed-denom">{'MsgAddAllowedDenom'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-buy-direct">{'MsgBuyDirect'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-cancel-sell-orders">{'MsgCancelSellOrders'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-remove-allowed-denom">{'MsgRemoveAllowedDenom'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-sell">{'MsgSell'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-update-sell-orders">{'MsgUpdateSellOrders'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-allowed-denoms">{'QueryAllowedDenoms'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-sell-order">{'QuerySellOrder'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-sell-orders">{'QuerySellOrders'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-sell-orders-by-batch">{'QuerySellOrdersByBatch'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-sell-orders-by-seller">
              {'QuerySellOrdersBySeller'}
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
