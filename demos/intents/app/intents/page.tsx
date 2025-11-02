import { Metadata } from 'next'

import ListIntents from '@components/intents/ListIntents'
import SubmitIntent from '@components/intents/SubmitIntent'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora intents',
}

const IntentsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'intents'}</h1>
      <ListIntents />
      <SubmitIntent />
    </div>
  </div>
)

export default IntentsPage
