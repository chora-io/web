'use client'

import ProjectsTableRow from '@components/projects/ProjectsTableRow'

import styles from './ProjectsTable.module.css'

const ProjectsTable = ({ projects }: any) => {
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
            <ProjectsTableRow key={project.id} project={project} />
          ))}
      </tbody>
    </table>
  )
}

export default ProjectsTable
