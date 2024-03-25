'use client'

import ClassesTableRow from '@components/classes/ClassesTableRow'

import styles from './ClassesTable.module.css'

const ClassesTable = ({ classes }: any) => {
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
            <ClassesTableRow key={clazz.id} clazz={clazz} />
          ))}
      </tbody>
    </table>
  )
}

export default ClassesTable
