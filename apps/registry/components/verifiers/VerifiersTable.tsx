'use client'

import VerifiersTableRow from '@components/verifiers/VerifiersTableRow'

import styles from './VerifiersTable.module.css'

const VerifiersTable = ({ verifiers }: any) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>{'id'}</td>
          <td>{'name'}</td>
          <td>{'description'}</td>
          <td>{'operator'}</td>
          <td>{'more'}</td>
        </tr>
      </thead>
      <tbody>
        {verifiers &&
          verifiers.map((verifier: any) => (
            <VerifiersTableRow key={verifier.id} verifier={verifier} />
          ))}
      </tbody>
    </table>
  )
}

export default VerifiersTable
