'use client'

import ProjectsListItem from '@components/projects/ProjectsListItem'

const ProjectsList = ({ projects }: any) => {
  return (
    <>
      {projects &&
        projects.map((project: any) => (
          <ProjectsListItem key={project.id} project={project} />
        ))}
    </>
  )
}

export default ProjectsList
