'use client'

import * as React from 'react'

import { Result } from '..'
import { ProjectsList, ProjectsTable, PaginationNav } from '../tables'

import styles from './Projects.module.css'

const Projects = ({
  projects,
  error,
  renderAddress,
  renderLink,
  limit,
  offset,
  setOffset,
  view,
  setView,
}: any) => {
  return (
    <div className={styles.box}>
      {view && setView && (
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
      )}
      {!projects && !error && (
        <div className={styles.boxText}>{'loading...'}</div>
      )}
      {!error && projects && projects.length === 0 && !offset && (
        <div className={styles.boxText}>{'no projects found'}</div>
      )}
      {((projects && projects.length > 0) || !!offset) && (
        <>
          {view === 'table' ? (
            <ProjectsTable
              projects={projects}
              renderAddress={renderAddress}
              renderLink={renderLink}
            />
          ) : (
            <ProjectsList
              projects={projects}
              renderAddress={renderAddress}
              renderLink={renderLink}
            />
          )}
          {limit && (
            <PaginationNav
              length={projects ? projects.length : 0}
              limit={limit}
              offset={offset}
              setOffset={setOffset}
            />
          )}
        </>
      )}
      <Result error={error} />
    </div>
  )
}

export default Projects
