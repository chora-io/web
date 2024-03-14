'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext } from 'react'

import ProjectPreview from '@components/projects/ProjectPreview'
import { useProjects } from '@hooks/useProjects'

import styles from './Projects.module.css'

const Projects = () => {
  const { chainInfo } = useContext(WalletContext)

  // fetch projects (curated by coop) from selected network
  const [projects, error] = useProjects(chainInfo)

  return (
    <div className={styles.box}>
      {!error && !projects && <div>{'loading...'}</div>}
      {!error && projects && projects.length === 0 && (
        <div>{'no class projects found'}</div>
      )}
      {Array.isArray(projects) &&
        projects.map((project) => (
          <ProjectPreview key={project['id']} project={project} />
        ))}
      <Result error={error} />
    </div>
  )
}

export default Projects
