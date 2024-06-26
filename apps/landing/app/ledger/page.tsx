import { ArrowUpRight } from 'chora/components/icons'
import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora ledger | blockchain network dashboard',
}

const LedgerPage = () => {
  let appLink = 'https://ledger.chora.io'

  if (process.env.NODE_ENV === 'development') {
    appLink = 'http://localhost:8003'
  }

  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <div>
          <h1>
            {'chora '}
            <span className={styles.titleX}>{'ledger'}</span>
          </h1>
          <p>
            <i>{'explore and interact with distributed ledgers'}</i>
          </p>
          <p>{'blockchain network dashboard'}</p>
          <div className={styles.buttonContainer}>
            <a className={styles.button} href={appLink} target="_blank">
              {'open app'}
              <ArrowUpRight useTheme={true} />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div>
          <p>
            {
              'Ledger is a dashboard for multiple blockchain networks enabling network stakeholders to explore and interact with distributed ledgers.'
            }
          </p>
          <div className={styles.contentLinks}>
            <a href={appLink} target="_blank">
              {'application'}
              <ArrowUpRight />
            </a>
            <a href="https://docs.chora.io/guides/ledger" target="_blank">
              {'user guide'}
              <ArrowUpRight />
            </a>
            <a href="https://github.com/chora-io/web" target="_blank">
              {'source code'}
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LedgerPage
