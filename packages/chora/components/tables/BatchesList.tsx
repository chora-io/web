'use client'

import * as React from 'react'

import { BatchesListItem } from '.'

import styles from './BatchesList.module.css'

const BatchesList = ({ batches, renderAddress, renderLink }: any) => {
  return (
    <div className={styles.list}>
      {batches &&
        batches.map((batch: any) => (
          <BatchesListItem
            key={batch.denom}
            batch={batch}
            renderAddress={renderAddress}
            renderLink={renderLink}
          />
        ))}
    </div>
  )
}

export default BatchesList
