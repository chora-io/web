import { Background } from 'chora/components'
import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop | group governance workspace',
}

const ChoraCoopPage = () => {
  let appLink = '/coop'

  if (process.env.NODE_ENV === 'development') {
    appLink = 'http://localhost:8001'
  }

  return (
    <div className={styles.container}>
      <Background />
      <div className={styles.banner}>
        <div>
          <h1>
            {'chora '}
            <span style={{ opacity: '0.75' }}>{'coop'}</span>
          </h1>
          <p>
            <i>{'cooperative governance on common ground'}</i>
          </p>
          <p>{'group governance workspace'}</p>
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
                'Coop is a governance workspace where groups of individuals (or groups of groups) make decisions and manage shared resources.'
              }
            </p>
            <p>
              {
                'Coop leverages a dynamic group framework to enable individuals to pool their resources as a group and to govern however they choose.'
              }
            </p>
            <p>
              {
                'Coop also enables groups to manage common land, community vouchers, and ecological claims and assets on multiple networks.'
              }
            </p>
          </div>
          <div className={styles.contentLinks}>
            <a href={appLink} target="_blank">
              {'application ↗'}
            </a>
            <a href="https://docs.chora.io/guides/coop" target="_blank">
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

export default ChoraCoopPage
