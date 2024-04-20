import { Metadata } from 'next'

import AddLocale from '@components/locales/AddLocale'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const AddPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'add locale'}</h1>
      <AddLocale />
    </div>
  </div>
)

export default AddPage
