import { Metadata } from 'next'

import Completion from '@components/Completion'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chat | completion',
}

const CompletionPage = () => (
  <div className={styles.page}>
    <div>
      <Completion />
    </div>
  </div>
)

export default CompletionPage
