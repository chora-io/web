'use client'

import * as React from 'react'

import { ProjectsListItem } from '.'

import styles from './ProjectsList.module.css'

const ProjectsList = ({ projects, renderAddress, renderLink }: any) => {
  return (
    <div className={styles.list}>
      {projects &&
        projects.map((project: any) => (
          <ProjectsListItem
            key={project.id}
            project={project}
            renderAddress={renderAddress}
            renderLink={renderLink}
          />
        ))}
    </div>
  )
}

export default ProjectsList
