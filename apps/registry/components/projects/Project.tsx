'use client'

import { Project } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useProject, useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

const ProjectContainer = () => {
  const { id } = useParams()

  const { chainInfo, network } = useContext(WalletContext)

  // fetch project from selected network
  const [project, projectError] = useProject(chainInfo, id.toString())

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    project ? project.metadata : null,
  )

  const error = projectError || metadataError

  const renderClassId = (classId: string) => (
    <Link href={`/${network}/classes/${classId}`}>{classId}</Link>
  )

  const renderMetadata = (metadata: string) => (
    <Link href={`/${network}/claims/${metadata}`}>{metadata}</Link>
  )

  return (
    <Project
      project={project}
      metadata={metadata}
      error={error}
      renderMetadata={renderMetadata}
      renderClassId={renderClassId}
    />
  )
}

export default ProjectContainer
