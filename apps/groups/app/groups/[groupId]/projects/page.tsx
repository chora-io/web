import { Metadata } from 'next'

import Projects from '@components/groups/projects/Projects'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const ProjectsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group projects'}</h1>
      <Projects />
    </div>
  </div>
)

export default ProjectsPage
