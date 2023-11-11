import { Metadata } from 'next'

import Content from '@components/Content'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'base | home',
}

const HomePage = () => (
  <div className={styles.page}>
    <div>
      <Content />
    </div>
  </div>
)

export default HomePage
