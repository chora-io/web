'use client'

import SubjectsTableRow from '@components/subjects/SubjectsTableRow'

import styles from './SubjectsTable.module.css'

const SubjectsTable = ({ subjects }: any) => {
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
        {subjects &&
          subjects.map((subject: any) => (
            <SubjectsTableRow key={subject.id} subject={subject} />
          ))}
      </tbody>
    </table>
  )
}

export default SubjectsTable
