'use client'

import * as React from 'react'
import { useContext } from 'react'

import { WalletContext } from '../../contexts'

import styles from './ClassesTableRow.module.css'

const ClassesTableRow = ({ clazz, renderAddress, renderLink }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <tr>
      <td>{clazz.id}</td>
      <td>{clazz['credit_type_abbrev']}</td>
      {renderAddress ? (
        <td>{renderAddress(clazz.admin)}</td>
      ) : (
        <td>
          {clazz.admin.substring(0, 13) + '...' + clazz.admin.substring(38, 44)}
          {wallet && clazz.admin === wallet.bech32Address && (
            <span className={styles.activeAccount}>{'(active account)'}</span>
          )}
        </td>
      )}
      <td style={{ minWidth: '120px' }}>
        {renderLink && renderLink(clazz.id)}
      </td>
    </tr>
  )
}

export default ClassesTableRow
