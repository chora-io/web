import { Background } from 'chora/components'
import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora ledger | blockchain network dashboard',
}

const ChoraLedgerPage = () => {
  let appLink = '/ledger'

  if (process.env.NODE_ENV === 'development') {
    appLink = 'http://localhost:8003'
  }

  return (
    <div className={styles.container}>
      <Background />
      <div className={styles.banner}>
        <div>
          <h1>
            {'chora '}
            <span style={{ opacity: '0.75' }}>{'ledger'}</span>
          </h1>
          <p>
            <i>{'explore and interact with distributed ledgers'}</i>
          </p>
          <p>{'blockchain network dashboard'}</p>
          <div style={{ textAlign: 'center', padding: '2em 0' }}>
            <a className={styles.button} href={appLink} target="_blank">
              {'open app ↗'}
            </a>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div>
          <div style={{ padding: '1em 0' }}>
            <p>
              {
                'Ledger is a dashboard for multiple blockchain networks enabling network stakeholders to explore and interact with distributed ledgers.'
              }
            </p>
          </div>
          <div className={styles.contentLinks}>
            <a href={appLink} target="_blank">
              {'application ↗'}
            </a>
            <a href="https://docs.chora.io/guides/ledger" target="_blank">
              {'user guide ↗'}
            </a>
            <a href="https://github.com/chora-io/web" target="_blank">
              {'source code ↗'}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChoraLedgerPage
