import { Metadata } from 'next'

import Locales from '@components/groups/locales/Locales'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const LocalesPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group locales'}</h1>
      <Locales />
    </div>
  </div>
)

export default LocalesPage
