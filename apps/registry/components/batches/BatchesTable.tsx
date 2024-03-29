'use client'

import BatchesTableRow from '@components/batches/BatchesTableRow'

import styles from './BatchesTable.module.css'

const BatchesTable = ({ batches }: any) => {
  return (
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
            <BatchesTableRow key={batch.denom} batch={batch} />
          ))}
      </tbody>
    </table>
  )
}

export default BatchesTable
