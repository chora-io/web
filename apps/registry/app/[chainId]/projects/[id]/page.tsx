import { Metadata } from 'next'

import Project from '@components/projects/Project'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const ProjectPage = () => (
  <div className={styles.page}>
    <h1>{'class project'}</h1>
    <Project />
  </div>
)

export default ProjectPage
