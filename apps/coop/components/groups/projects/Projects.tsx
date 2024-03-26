'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import ProjectPreview from '@components/groups/projects/ProjectPreview'
import { useCreditProjects } from '@hooks/useCreditProjects'

import styles from './Projects.module.css'

const Projects = () => {
  const { groupId } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch credit projects (administered by coop) from selected network
  const [projects, error] = useCreditProjects(chainInfo, groupId)

  return (
    <div className={styles.box}>
      {!error && !projects && <div>{'loading...'}</div>}
      {!error && projects && projects.length === 0 && (
        <div>{'no projects found'}</div>
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
