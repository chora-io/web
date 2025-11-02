import { Metadata } from 'next'

import styles from './not-found.module.css'

export const metadata: Metadata = {
  title: 'page not found',
}

const NotFoundPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'404'}</h1>
      <h2>{'a placeless place'}</h2>
      <p>{'the page you are looking for does not exist at this location'}</p>
    </div>
  </div>
)

export default NotFoundPage
