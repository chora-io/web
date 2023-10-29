import { Metadata } from 'next'

import Background from '@components/Background'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora protocol | distributed ledger technology',
}

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Background />
      <div className={styles.sectionMain}>
        <div>
          <h1>{'chora '}<span style={{ opacity: '0.75' }}>{'protocol'}</span></h1>
          <p>
            <i>{'the grass is always greener on the decentralized web'}</i>
          </p>
          <p>{'distributed ledger technology'}</p>
        </div>
      </div>
      <div className={styles.sectionText}>
        <div>
          <p>
            {
              'Chora Protocol is experimental software that leverages distributed ledger technology for commons governance and ecological regeneration.'
            }
          </p>
          <p>
            {
              'Chora Protocol is currently stewarded by '
            }
            <a href="https://chora.studio" target="_blank">
              {'Chora Studio'}
            </a>
            {
              ', a software research and development company building distributed ledger technologies.'
            }
          </p>
          <div className={styles.sectionTextLinks}>
            <a href="https://docs.chora.io" target="_blank">
              {'view documentation ↗'}
            </a>
            <a href="https://github.com/choraio" target="_blank">
              {'view repositories ↗'}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
