import { Metadata } from 'next'

import AnchoredData from '@components/services/AnchoredData'
import ConvertData from '@components/services/ConvertData'
import GetData from '@components/services/GetData'
import PostData from '@components/services/PostData'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const DatabasePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'data service'}</h1>
      <AnchoredData />
      <ConvertData />
      <GetData />
      <PostData />
    </div>
  </div>
)

export default DatabasePage
