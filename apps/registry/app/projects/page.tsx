import { Metadata } from 'next'

import Projects from '@components/projects/Projects'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const ProjectsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'explore projects'}</h1>
      <Projects />
    </div>
  </div>
)

export default ProjectsPage
