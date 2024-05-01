import { Metadata } from 'next'

import GetData from '@components/server/GetData'
import PostData from '@components/server/PostData'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora data',
}

const ServerPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'chora server'}</h1>
      <GetData />
      <PostData />
    </div>
  </div>
)

export default ServerPage
