'use client'

import BasketsTableRow from '@components/baskets/BasketsTableRow'

import styles from './BasketsTable.module.css'

const BasketsTable = ({ baskets }: any) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>{'denom'}</td>
          <td>{'curator'}</td>
          <td>{'more'}</td>
        </tr>
      </thead>
      <tbody>
        {baskets &&
          baskets.map((basket: any) => (
            <BasketsTableRow key={basket.denom} basket={basket} />
          ))}
      </tbody>
    </table>
  )
}

export default BasketsTable
