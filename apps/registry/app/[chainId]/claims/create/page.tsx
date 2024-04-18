import { Metadata } from 'next'

import CreateClaim from '@components/claims/CreateClaim'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const CreatePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'create data claim'}</h1>
      <CreateClaim />
    </div>
  </div>
)

export default CreatePage
