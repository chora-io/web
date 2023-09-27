'use client'

// import { Metadata } from 'next'

import GetData from '@components/server/GetData'
import PostData from '@components/server/PostData'

import styles from './page.module.css'

// export const metadata: Metadata = {
//   title: 'server',
// }

const ServerPage = () => (
  <div className={styles.page}>
    <div>
      <GetData />
      <PostData />
    </div>
  </div>
)

export default ServerPage
