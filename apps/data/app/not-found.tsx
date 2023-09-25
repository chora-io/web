'use client'

// import { Metadata } from 'next'

import styles from "./not-found.module.css"

// export const metadata: Metadata = {
//   title: '404 | a placeless place',
// }

const NotFoundPage = () => (
  <div className={styles.page}>
    <div>
      <h1>
        {'404'}
      </h1>
      <h2>
        {'a placeless place'}
      </h2>
    </div>
  </div>
)

export default NotFoundPage
