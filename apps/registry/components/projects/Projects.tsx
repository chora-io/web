'use client'

import { Projects } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext, useState } from 'react'

import { useProjects } from '@hooks/useProjects'

const ProjectsContainer = () => {
  const { chainInfo, network } = useContext(WalletContext)

  const limit = 5

  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // fetch projects from selected network
  const [projects, error] = useProjects(chainInfo, limit, offset)

  const renderLink = (projectId: string) => (
    <Link href={`/${network}/projects/${projectId}`}>{'view project'}</Link>
  )

  return (
    <Projects
      projects={projects}
      error={error}
      renderLink={renderLink}
      limit={limit}
      offset={offset}
      setOffset={setOffset}
      view={view}
      setView={setView}
    />
  )
}

export default ProjectsContainer
