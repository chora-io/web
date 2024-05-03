'use client'

import { Projects } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'
import { GroupContext } from '@contexts/GroupContext'
import { useGroupProjects } from '@hooks/useGroupProjects'

const ProjectsContainer = () => {
  const { groupId } = useParams()

  const { policies, policiesError } = useContext(GroupContext)
  const { chainInfo, network } = useContext(WalletContext)

  // TODO: limit, offset, setOffset, view, setView

  // fetch class projects administered by group from selected network
  const [projects, projectsError] = useGroupProjects(chainInfo, policies)

  const error = policiesError || projectsError

  const renderAddress = (address: string) => <Address address={address} />

  const renderLink = (denom: string) => (
    <Link href={`/${network}/${groupId}/projects/${denom}`}>
      {'view project'}
    </Link>
  )

  return (
    <Projects
      projects={projects}
      error={error}
      renderAddress={renderAddress}
      renderLink={renderLink}
    />
  )
}

export default ProjectsContainer
