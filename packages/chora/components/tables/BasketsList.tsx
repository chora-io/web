'use client'

import * as React from 'react'

import { BasketsListItem } from '.'

import styles from './BasketsList.module.css'

const BasketsList = ({ baskets, renderAddress, renderLink }: any) => {
  return (
    <div className={styles.list}>
      {baskets &&
        baskets.map((basket: any) => (
          <BasketsListItem
            key={basket.denom}
            basket={basket}
            renderAddress={renderAddress}
            renderLink={renderLink}
          />
        ))}
    </div>
  )
}

export default BasketsList
