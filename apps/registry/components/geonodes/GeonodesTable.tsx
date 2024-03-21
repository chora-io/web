'use client'

import GeonodesTableRow from '@components/geonodes/GeonodesTableRow'

import styles from './GeonodesTable.module.css'

const GeonodesTable = ({ nodes }: any) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>{'id'}</td>
          <td>{'name'}</td>
          <td>{'description'}</td>
          <td>{'curator'}</td>
          <td>{'more'}</td>
        </tr>
      </thead>
      <tbody>
        {nodes &&
          nodes.map((node: any) => (
            <GeonodesTableRow key={node.id} node={node} />
          ))}
      </tbody>
    </table>
  )
}

export default GeonodesTable
