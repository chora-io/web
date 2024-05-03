'use client'

import * as React from 'react'
import { useContext } from 'react'

import { WalletContext } from '../../contexts'
import { useMetadata } from '../../hooks'

import styles from './VouchersTableRow.module.css'

const VouchersTableRow = ({ voucher, renderAddress, renderLink }: any) => {
  const { chainInfo, wallet } = useContext(WalletContext)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(chainInfo, voucher.metadata)

  // TODO: handle error
  if (metadataError) {
    console.error(metadataError)
  }

  return (
    <tr>
      <td>{voucher.id}</td>
      <td>
        {metadata && metadata.name
          ? metadata.name.substring(0, 25) +
            (metadata.name.length > 25 ? '...' : '')
          : 'NA'}
      </td>
      <td>
        {metadata && metadata.description
          ? metadata.description.substring(0, 50) +
            (metadata.description.length > 50 ? '...' : '')
          : 'NA'}
      </td>
      {renderAddress ? (
        <td>{renderAddress(voucher.issuer)}</td>
      ) : (
        <td>
          {voucher.issuer.substring(0, 13) +
            '...' +
            voucher.issuer.substring(38, 44)}
          {wallet && voucher.issuer === wallet.bech32Address && (
            <span className={styles.activeAccount}>{'(active account)'}</span>
          )}
        </td>
      )}
      <td style={{ minWidth: '120px' }}>
        {renderLink && renderLink(voucher.id)}
      </td>
    </tr>
  )
}

export default VouchersTableRow
