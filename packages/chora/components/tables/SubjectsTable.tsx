'use client'

import * as React from 'react'

import { SubjectsTableRow } from '.'

import styles from './SubjectsTable.module.css'

const SubjectsTable = ({ subjects, renderAddress, renderLink }: any) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>{'id'}</td>
            <td>{'name'}</td>
            <td>{'description'}</td>
            <td>{'steward'}</td>
            <td>{'more'}</td>
          </tr>
        </thead>
        <tbody>
          {subjects &&
            subjects.map((subject: any) => (
              <SubjectsTableRow
                key={subject.id}
                subject={subject}
                renderAddress={renderAddress}
                renderLink={renderLink}
              />
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default SubjectsTable
