import { Metadata } from 'next'

import AnchoredData from '@components/anchor/AnchoredData'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora data',
}

const AnchorPage = () => (
  <div className={styles.page}>
    <div>
      <AnchoredData />
    </div>
  </div>
)

export default AnchorPage
