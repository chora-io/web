'use client'

import CreditsTableRow from '@components/credits/CreditsTableRow'

import styles from './CreditsTable.module.css'

const CreditsTable = ({ batches }: any) => {
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
            <CreditsTableRow key={batch.denom} batch={batch} />
          ))}
      </tbody>
    </table>
  )
}

export default CreditsTable
