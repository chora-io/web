import { Metadata } from 'next'

import AnchoredData from '@components/anchor/AnchoredData'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora data',
}

const AnchorPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'anchor data'}</h1>
      <AnchoredData />
    </div>
  </div>
)

export default AnchorPage
