'use client'

import * as React from 'react'

import { BatchesTableRow } from '.'

import styles from './BatchesTable.module.css'

const BatchesTable = ({ batches, renderAddress, renderLink }: any) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>{'denom'}</td>
            <td>{'issuance date'}</td>
            <td>{'issuer'}</td>
            <td>{'more'}</td>
          </tr>
        </thead>
        <tbody>
          {batches &&
            batches.map((batch: any) => (
              <BatchesTableRow
                key={batch.denom}
                batch={batch}
                renderAddress={renderAddress}
                renderLink={renderLink}
              />
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default BatchesTable
