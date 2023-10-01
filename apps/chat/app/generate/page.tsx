import { Metadata } from 'next'

import Generate from '@components/Generate'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chat | generate',
}

const HomePage = () => (
  <div className={styles.page}>
    <div>
      <Generate />
    </div>
  </div>
)

export default HomePage
