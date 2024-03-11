import { Metadata } from 'next'

import ConvertData from '@components/convert/ConvertData'
import GetData from '@components/server/GetData'
import PostData from '@components/server/PostData'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const AssetsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'manage ecological claims'}</h1>
      <ConvertData />
      <GetData />
      <PostData />
    </div>
  </div>
)

export default AssetsPage
