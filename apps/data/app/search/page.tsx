import { Metadata } from 'next'

import AnchoredData from '@components/search/AnchoredData'
import DataResolvers from '@components/search/DataResolvers'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'data | search',
}

const SearchPage = () => (
  <div className={styles.page}>
    <div>
      <AnchoredData />
      <DataResolvers />
    </div>
  </div>
)

export default SearchPage
