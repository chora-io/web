'use client'

import { Project } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useMetadata, useSubject } from 'chora/hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

const ProjectContainer = () => {
  const { id } = useParams()
  const { chainInfo, network } = useContext(WalletContext)

  // fetch project from selected network
  const [project, projectError] = useSubject(chainInfo, `${id}`)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    project ? project.metadata : null,
  )

  const error = projectError || metadataError

  const renderAddress = (address: string) => <Address address={address} />

  const renderMetadata = (metadata: string) => (
    <Link href={`/${network}/claims/${metadata}`}>{metadata}</Link>
  )

  return (
    <Project
      project={project}
      metadata={metadata}
      error={error}
      renderAddress={renderAddress}
      renderMetadata={renderMetadata}
    />
  )
}

export default ProjectContainer
