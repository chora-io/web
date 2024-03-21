'use client'

import { PaginationNav, Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import ProjectsList from '@components/projects/ProjectsList'
import ProjectsTable from '@components/projects/ProjectsTable'
import { useProjects } from '@hooks/useProjects'

import styles from './Projects.module.css'

const Projects = () => {
  const { chainInfo } = useContext(WalletContext)

  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // fetch projects from selected network
  const [projects, error] = useProjects(chainInfo, 5, offset)

  return (
    <div className={styles.box}>
      <div className={styles.boxOptions}>
        <button
          className={view === 'table' ? styles.active : undefined}
          onClick={() => setView('table')}
        >
          {'table view'}
        </button>
        <button
          className={view === 'list' ? styles.active : undefined}
          onClick={() => setView('list')}
        >
          {'list view'}
        </button>
      </div>
      {!projects && !error && <p>{'loading...'}</p>}
      {projects && projects.length === 0 && <p>{'no projects found'}</p>}
      {projects && projects.length > 0 && (
        <>
          {view === 'table' ? (
            <ProjectsTable projects={projects} />
          ) : (
            <ProjectsList projects={projects} />
          )}
          <PaginationNav
            length={projects ? projects.length : 0}
            maxLength={5}
            offset={offset}
            setOffset={setOffset}
          />
        </>
      )}
      <Result error={error} />
    </div>
  )
}

export default Projects
