'use client'

import { Project } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useMetadata, useProject } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

const ProjectContainer = () => {
  const { id } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch project from selected network
  const [project, projectError] = useProject(chainInfo, `${id}`)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    project ? project.metadata : null,
  )

  const error = projectError || metadataError

  const renderAddress = (address: string) => <Address address={address} />

  return (
    <Project
      project={project}
      metadata={metadata}
      error={error}
      renderAddress={renderAddress}
    />
  )
}

export default ProjectContainer
