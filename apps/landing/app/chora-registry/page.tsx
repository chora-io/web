import { Background } from 'chora/components'
import { Metadata } from 'next'
import Link from 'next/link'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry | open registry workspace',
}

const RegistryPage = () => {
  let appLink = '/registry'

  if (process.env.NODE_ENV === 'development') {
    appLink = 'http://localhost:8002'
  }

  return (
    <div className={styles.container}>
      <Background />
      <div className={styles.banner}>
        <div>
          <h1>
            {'chora '}
            <span style={{ opacity: '0.75' }}>{'registry'}</span>
          </h1>
          <p>
            <i>{'decentralized ecological claims and assets'}</i>
          </p>
          <p>{'open registry workspace'}</p>
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
                'Registry is a decentralized ecological claims and asset registry and an open workspace to create and manage registry workflows.'
              }
            </p>
            <p>
              {
                'Registry enables registry system actors to collaborate on registry workflows from project registration to credit issuance and retirement.'
              }
            </p>
            <p>
              {'Registry leverages '}
              <Link href="https://regen.network" target="_blank">
                {'Regen Network'}
              </Link>
              {
                "'s blockchain application and network to enable open crediting for ecological regeneration projects."
              }
            </p>
          </div>
          <div className={styles.contentLinks}>
            <a href={appLink} target="_blank">
              {'application ↗'}
            </a>
            <a href="https://docs.chora.io/guides/registry" target="_blank">
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

export default RegistryPage
