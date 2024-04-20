'use client'

import LocalesTableRow from '@components/locales/LocalesTableRow'

import styles from './LocalesTable.module.css'

const LocalesTable = ({ locales }: any) => {
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
        {locales &&
          locales.map((locale: any) => (
            <LocalesTableRow key={locale.id} locale={locale} />
          ))}
      </tbody>
    </table>
  )
}

export default LocalesTable
