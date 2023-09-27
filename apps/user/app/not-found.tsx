import * as React from 'react'

import Layout from './layout'

import styles from './not-found.module.css'

const NotFoundPage = () => (
  <Layout withBackground={true}>
    <div className={styles.page}>
      <div>
        <h1>{'404'}</h1>
        <h2>{'a placeless place'}</h2>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
