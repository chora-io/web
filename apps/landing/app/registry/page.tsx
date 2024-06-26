import { ArrowUpRight } from 'chora/components/icons'
import { Metadata } from 'next'
import Link from 'next/link'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry | ecological registry workspace',
}

const RegistryPage = () => {
  let appLink = 'https://registry.chora.io'

  if (process.env.NODE_ENV === 'development') {
    appLink = 'http://localhost:8002'
  }

  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <div>
          <h1>
            {'chora '}
            <span className={styles.titleX}>{'registry'}</span>
          </h1>
          <p>
            <i>{'decentralized ecological claims and assets'}</i>
          </p>
          <p>{'ecological registry workspace'}</p>
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
              'Registry is an explorer for decentralized ecological claims and assets and an open workspace to create and manage registry workflows.'
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
          <div className={styles.contentLinks}>
            <a href={appLink} target="_blank">
              {'application'}
              <ArrowUpRight />
            </a>
            <a href="https://docs.chora.io/guides/registry" target="_blank">
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

export default RegistryPage
