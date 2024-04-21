'use client'

import ResolversTableRow from '@components/resolvers/ResolversTableRow'

import styles from './ResolversTable.module.css'

const ResolversTable = ({ resolvers }: any) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>{'id'}</td>
          <td>{'name'}</td>
          <td>{'description'}</td>
          <td>{'manager'}</td>
          <td>{'more'}</td>
        </tr>
      </thead>
      <tbody>
        {resolvers &&
          resolvers.map((resolver: any) => (
            <ResolversTableRow key={resolver.id} resolver={resolver} />
          ))}
      </tbody>
    </table>
  )
}

export default ResolversTable
