'use client'

import * as React from 'react'

import { BasketsTableRow } from '.'

import styles from './BasketsTable.module.css'

const BasketsTable = ({ baskets, renderAddress, renderLink }: any) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>{'denom'}</td>
            <td>{'name'}</td>
            <td>{'curator'}</td>
            <td>{'more'}</td>
          </tr>
        </thead>
        <tbody>
          {baskets &&
            baskets.map((basket: any) => (
              <BasketsTableRow
                key={basket.denom}
                basket={basket}
                renderAddress={renderAddress}
                renderLink={renderLink}
              />
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default BasketsTable
