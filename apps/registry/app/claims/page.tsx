import { Metadata } from 'next'

import AnchoredData from '@components/search/AnchoredData'
import DataResolvers from '@components/search/DataResolvers'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const AssetsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'explore ecological claims'}</h1>
      <AnchoredData />
      <DataResolvers />
    </div>
  </div>
)

export default AssetsPage
