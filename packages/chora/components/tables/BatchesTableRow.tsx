'use client'

import * as React from 'react'
import { useContext } from 'react'

import { WalletContext } from '../../contexts'
import { formatTimestamp, subAddress } from '../../utils'

import styles from './BatchesTableRow.module.css'

const BatchesTableRow = ({ batch, renderAddress, renderLink }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <tr>
      <td>{batch.denom}</td>
      <td>{formatTimestamp(batch['issuance_date'])}</td>
      {renderAddress ? (
        <td>{renderAddress(batch.issuer)}</td>
      ) : (
        <td>
          {subAddress(batch.issuer)}
          {wallet && batch.issuer === wallet.bech32Address && (
            <span className={styles.activeAccount}>{'(active account)'}</span>
          )}
        </td>
      )}
      <td style={{ minWidth: '120px' }}>
        {renderLink && renderLink(batch.denom)}
      </td>
    </tr>
  )
}

export default BatchesTableRow
