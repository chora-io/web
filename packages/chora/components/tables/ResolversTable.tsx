'use client'

import * as React from 'react'

import { ResolversTableRow } from '.'

import styles from './ResolversTable.module.css'

const ResolversTable = ({ resolvers, renderAddress, renderLink }: any) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>{'id'}</td>
          <td>{'url'}</td>
          <td>{'manager'}</td>
          <td>{'more'}</td>
        </tr>
      </thead>
      <tbody>
        {resolvers &&
          resolvers.map((resolver: any) => (
            <ResolversTableRow
              key={resolver.id}
              resolver={resolver}
              renderAddress={renderAddress}
              renderLink={renderLink}
            />
          ))}
      </tbody>
    </table>
  )
}

export default ResolversTable
