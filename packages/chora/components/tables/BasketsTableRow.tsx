'use client'

import * as React from 'react'
import { useContext } from 'react'

import { WalletContext } from '../../contexts'

import styles from './BasketsTableRow.module.css'

const BasketsTableRow = ({ basket, renderAddress, renderLink }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <tr>
      <td>{basket.denom}</td>
      <td>{basket.name}</td>
      {renderAddress ? (
        <td>{renderAddress(basket.curator)}</td>
      ) : (
        <td>
          {basket.curator.substring(0, 13) +
            '...' +
            basket.curator.substring(38, 44)}
          {wallet && basket.curator === wallet.bech32Address && (
            <span className={styles.activeAccount}>{'(active account)'}</span>
          )}
        </td>
      )}
      <td style={{ minWidth: '120px' }}>
        {renderLink && renderLink(basket.denom)}
      </td>
    </tr>
  )
}

export default BasketsTableRow
