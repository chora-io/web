import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const HomePage = () => (
  <div className={styles.page}>
    <h1>{'chora ledger'}</h1>
    <h2>{'blockchain network dashboard'}</h2>
    <p>
      {'This application is a '}
      <span className={styles.beta}>{'beta application'}</span>
      {'. This application is not ready for production use.'}
    </p>
    <p>
      {
        'Limiting your interactions with main networks is recommended until the application matures.'
      }
    </p>
    <p>
      {
        'Thank you for testing out the application. Please enjoy and use with care and caution.'
      }
    </p>
  </div>
)

export default HomePage
