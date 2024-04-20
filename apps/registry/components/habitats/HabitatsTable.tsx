'use client'

import HabitatsTableRow from '@components/habitats/HabitatsTableRow'

import styles from './HabitatsTable.module.css'

const HabitatsTable = ({ nodes }: any) => {
  return (
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
        {nodes &&
          nodes.map((node: any) => (
            <HabitatsTableRow key={node.id} node={node} />
          ))}
      </tbody>
    </table>
  )
}

export default HabitatsTable
