import { Metadata } from 'next'

import Projects from '@components/projects/Projects'
import ProjectsNav from '@components/projects/ProjectsNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const ProjectsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'explore class projects'}</h1>
      <ProjectsNav />
      <Projects />
    </div>
  </div>
)

export default ProjectsPage
