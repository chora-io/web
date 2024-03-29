import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const HomePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'chora coop'}</h1>
      <h2>{'group governance workspace'}</h2>
      <p>
        {'This application is a '}
        <span style={{ fontWeight: '400', textDecoration: 'underline' }}>
          {'beta application'}
        </span>
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
  </div>
)

export default HomePage
