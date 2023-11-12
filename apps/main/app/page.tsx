import { Background } from 'chora/components'
import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora | distributed ledger technology',
}

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Background />
      <div className={styles.banner}>
        <div>
          <h1>{'chora '}</h1>
          <p>
            <i>{'the grass is always greener on the decentralized web'}</i>
          </p>
          <p>{'distributed ledger technology'}</p>
        </div>
      </div>
      <div className={styles.content}>
        <div>
          <p>
            {
              'Chora is experimental software for commons governance and ecological regeneration built with distributed ledger technology.'
            }
          </p>
          <p>
            {'Chora is stewarded by '}
            <a href="https://chora.studio" target="_blank">
              {'Chora Studio'}
            </a>
            {
              ', a software research and development company specializing in infrastructure for climate solutions.'
            }
          </p>
          <div className={styles.contentLinks}>
            <a href="https://docs.chora.io" target="_blank">
              {'view documentation ↗'}
            </a>
            <a href="https://github.com/chora-io" target="_blank">
              {'view repositories ↗'}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
