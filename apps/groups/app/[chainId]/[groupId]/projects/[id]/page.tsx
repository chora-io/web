import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import Project from '@components/groups/projects/Project'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const ProjectPage = () => (
  <div className={styles.page}>
    <div>
      <Breadcrumb text="projects" />
      <h1>{'group class project'}</h1>
      <Project />
    </div>
  </div>
)

export default ProjectPage
