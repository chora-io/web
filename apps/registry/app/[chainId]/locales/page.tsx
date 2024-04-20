import { Metadata } from 'next'

import Locales from '@components/locales/Locales'
import LocalesNav from '@components/locales/LocalesNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const LocalesPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'explore locales'}</h1>
      <LocalesNav />
      <Locales />
    </div>
  </div>
)

export default LocalesPage
