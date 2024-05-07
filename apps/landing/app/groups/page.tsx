import { ArrowUpRight } from 'chora/components/icons'
import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups | group governance workspace',
}

const GroupsPage = () => {
  let appLink = 'https://groups.chora.io'

  if (process.env.NODE_ENV === 'development') {
    appLink = 'http://localhost:8001'
  }

  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <div>
          <h1>
            {'chora '}
            <span className={styles.titleX}>{'groups'}</span>
          </h1>
          <p>
            <i>{'cooperative governance on common ground'}</i>
          </p>
          <p>{'group governance workspace'}</p>
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
              'Groups is a governance workspace where groups of individuals (or groups of groups) make decisions and manage shared resources.'
            }
          </p>
          <p>
            {
              'Groups leverages a dynamic group framework to enable individuals to pool their resources as a group and to govern however they choose.'
            }
          </p>
          <p>
            {
              'Groups also enables groups to manage common land, community vouchers, and ecological claims and assets on multiple networks.'
            }
          </p>
          <div className={styles.contentLinks}>
            <a href={appLink} target="_blank">
              {'application'}
              <ArrowUpRight />
            </a>
            <a href="https://docs.chora.io/guides/groups" target="_blank">
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

export default GroupsPage
