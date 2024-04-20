'use client'

import SpeciesTableRow from '@components/species/SpeciesTableRow'

import styles from './SpeciesTable.module.css'

const SpeciesTable = ({ species }: any) => {
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
        {species &&
          species.map((s: any) => <SpeciesTableRow key={s.id} species={s} />)}
      </tbody>
    </table>
  )
}

export default SpeciesTable
