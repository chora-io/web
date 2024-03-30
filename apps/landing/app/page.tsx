import { Metadata } from 'next'
import Link from 'next/link'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora | distributed ledger technology',
}

const HomePage = () => {
  return (
    <div className={styles.page}>
      <div>
        <div className={styles.banner}>
          <div>
            <h1>{'chora'}</h1>
            <p>
              <i>{'commons governance and ecological regeneration'}</i>
            </p>
            <p>{'distributed ledger technology'}</p>
          </div>
        </div>
        <div className={styles.content}>
          <div>
            <h1>{'what is chora?'}</h1>
            <p>
              {
                'Chora is a placeless place where ideas wax and wane. Chora is also software for commons governance and ecological regeneration.'
              }
            </p>
            <p>
              {
                'Chora includes a blockchain application, blockchain modules, a database and API service, and three web applications: '
              }
              <Link href="/chora-coop">{'Coop'}</Link>
              {', '}
              <Link href="/chora-registry">{'Registry'}</Link>
              {', and '}
              <Link href="/chora-ledger">{'Ledger'}</Link>
              {'.'}
            </p>
            <p>
              {
                'Chora also includes demo applications, developer tools, and other software experiments. For more information, see '
              }
              <a href="https://docs.chora.io" target="_blank">
                {'Chora Documentation'}
              </a>
              {'.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
