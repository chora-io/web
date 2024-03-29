import { Metadata } from 'next'

import CreateClass from '@components/classes/CreateClass'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const CreatePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'create credit class'}</h1>
      <CreateClass />
    </div>
  </div>
)

export default CreatePage
