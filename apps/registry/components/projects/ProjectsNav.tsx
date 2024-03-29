'use client'

import Link from 'next/link'

import styles from './ProjectsNav.module.css'

const ProjectsNav = () => {
  return (
    <div className={styles.box}>
      <Link href={`/projects/create`}>{'create project'}</Link>
    </div>
  )
}

export default ProjectsNav
