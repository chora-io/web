'use client'

import GroupsTableRow from '@components/groups/GroupsTableRow'

import styles from './GroupsTable.module.css'

const GroupsTable = ({ groups }: any) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>{'id'}</td>
          <td>{'name'}</td>
          <td>{'description'}</td>
          <td>{'admin'}</td>
          <td>{'more'}</td>
        </tr>
      </thead>
      <tbody>
        {groups &&
          groups.map((group: any) => (
            <GroupsTableRow key={group.id} group={group} />
          ))}
      </tbody>
    </table>
  )
}

export default GroupsTable
