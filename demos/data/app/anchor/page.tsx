import { Metadata } from 'next'

import AnchorData from '@components/anchor/AnchorData'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const AnchorPage = () => (
  <div className={styles.page}>
    <div>
      <AnchorData />
    </div>
  </div>
)

export default AnchorPage
