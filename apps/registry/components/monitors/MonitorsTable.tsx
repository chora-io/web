'use client'

import MonitorsTableRow from '@components/monitors/MonitorsTableRow'

import styles from './MonitorsTable.module.css'

const MonitorsTable = ({ monitors }: any) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>{'id'}</td>
          <td>{'name'}</td>
          <td>{'description'}</td>
          <td>{'operator'}</td>
          <td>{'more'}</td>
        </tr>
      </thead>
      <tbody>
        {monitors &&
          monitors.map((monitor: any) => (
            <MonitorsTableRow key={monitor.id} monitor={monitor} />
          ))}
      </tbody>
    </table>
  )
}

export default MonitorsTable
