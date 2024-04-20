import { Metadata } from 'next'

import Locale from '@components/locales/Locale'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const LocalePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'locale'}</h1>
      <Locale />
    </div>
  </div>
)

export default LocalePage
