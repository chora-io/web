'use client'

import * as React from 'react'

import { ProjectsTableRow } from '.'

import styles from './ProjectsTable.module.css'

const ProjectsTable = ({ projects, renderAddress, renderLink }: any) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>{'id'}</td>
          <td>{'jurisdiction'}</td>
          <td>{'admin'}</td>
          <td>{'more'}</td>
        </tr>
      </thead>
      <tbody>
        {projects &&
          projects.map((project: any) => (
            <ProjectsTableRow
              key={project.id}
              project={project}
              renderAddress={renderAddress}
              renderLink={renderLink}
            />
          ))}
      </tbody>
    </table>
  )
}

export default ProjectsTable
