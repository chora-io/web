import { Metadata } from 'next'

import AnchoredData from '@components/workspace/data/AnchoredData'
import ConvertData from '@components/workspace/data/ConvertData'
import GetData from '@components/workspace/data/GetData'
import PostData from '@components/workspace/data/PostData'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const DatabasePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'data tools'}</h1>
      <AnchoredData />
      <ConvertData />
      <GetData />
      <PostData />
    </div>
  </div>
)

export default DatabasePage
