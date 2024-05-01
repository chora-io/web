import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import CreateProject from '@components/projects/CreateProject'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const CreatePage = () => (
  <div className={styles.page}>
    <div>
      <Breadcrumb text="projects" />
      <h1>{'create class project'}</h1>
      <CreateProject />
    </div>
  </div>
)

export default CreatePage
