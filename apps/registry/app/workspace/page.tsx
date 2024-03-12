import { Metadata } from 'next'

import AnchoredData from '@components/workspace/AnchoredData'
import ConvertData from '@components/workspace/ConvertData'
import GetData from '@components/workspace/GetData'
import PostData from '@components/workspace/PostData'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const DatabasePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'workspace overview'}</h1>
      <AnchoredData />
      <ConvertData />
      <GetData />
      <PostData />
    </div>
  </div>
)

export default DatabasePage
