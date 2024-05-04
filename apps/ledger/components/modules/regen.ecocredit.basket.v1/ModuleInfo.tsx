'use client'

import { regenEcocreditBasketV1 } from 'cosmos/modules'
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
      <div className={styles.infoBox}>
        {showInfo && <MoreInfo module={regenEcocreditBasketV1} />}
        <ul>
          <li className={styles.inactive}>
            <a href="#msg-create">{'MsgCreate'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-put">{'MsgPut'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-take">{'MsgTake'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-update-basket-fee">{'MsgUpdateBasketFee'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-update-curator">{'MsgUpdateCurator'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#msg-update-date-criteria">{'MsgUpdateDateCriteria'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-basket">{'QueryBasket'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-baskets">{'QueryBaskets'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-basket-balance">{'QueryBasketBalance'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-basket-balances">{'QueryBasketBalances'}</a>
          </li>
          <li className={styles.inactive}>
            <a href="#query-basket-fee">{'QueryBasketFee'}</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
