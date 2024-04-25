'use client'

import * as React from 'react'
import { useContext } from 'react'

import { WalletContext } from '../../contexts'
import { useMetadata } from '../../hooks'

import styles from './SubjectsTableRow.module.css'

const SubjectsTableRow = ({ subject, renderAddress, renderLink }: any) => {
  const { chainInfo, wallet } = useContext(WalletContext)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, error] = useMetadata(chainInfo, subject.metadata)

  // TODO: handle error
  if (error) {
    console.error(error)
  }

  return (
    <tr>
      <td>{subject.id}</td>
      <td>
        {metadata && metadata['name']
          ? metadata['name'].substring(0, 25) +
            (metadata['name'].length > 25 ? '...' : '')
          : 'NA'}
      </td>
      <td>
        {metadata && metadata['description']
          ? metadata['description'].substring(0, 50) +
            (metadata['description'].length > 50 ? '...' : '')
          : 'NA'}
      </td>
      {renderAddress ? (
        <td>{renderAddress(subject.curator)}</td>
      ) : (
        <td>
          {subject.curator.substring(0, 13) +
            '...' +
            subject.curator.substring(38, 44)}
          {wallet && subject.curator === wallet.bech32Address && (
            <span className={styles.activeAccount}>{'(active account)'}</span>
          )}
        </td>
      )}
      <td style={{ minWidth: '120px' }}>
        {renderLink && renderLink(subject.id)}
      </td>
    </tr>
  )
}

export default SubjectsTableRow
