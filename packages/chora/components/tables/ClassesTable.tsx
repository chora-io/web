'use client'

import * as React from 'react'

import { ClassesTableRow } from '.'

import styles from './ClassesTable.module.css'

const ClassesTable = ({ classes, renderAddress, renderLink }: any) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>{'id'}</td>
          <td>{'credit type abbrev'}</td>
          <td>{'admin'}</td>
          <td>{'more'}</td>
        </tr>
      </thead>
      <tbody>
        {classes &&
          classes.map((clazz: any) => (
            <ClassesTableRow
              key={clazz.id}
              clazz={clazz}
              renderAddress={renderAddress}
              renderLink={renderLink}
            />
          ))}
      </tbody>
    </table>
  )
}

export default ClassesTable
