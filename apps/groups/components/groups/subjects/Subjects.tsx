'use client'

import { Subjects } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'
import { GroupContext } from '@contexts/GroupContext'
import { useGroupSubjects } from '@hooks/useGroupSubjects'

const SubjectsContainer = () => {
  const { groupId } = useParams()

  const { policies, policiesError } = useContext(GroupContext)
  const { chainInfo, network } = useContext(WalletContext)

  // fetch subjects curated by group from selected network
  const [subjects, subjectsError] = useGroupSubjects(chainInfo, policies)

  const error = policiesError || subjectsError

  const renderAddress = (address: string) => <Address address={address} />

  const renderLink = (id: string) => (
    <Link href={`/${network}/${groupId}/subjects/${id}`}>{'view subject'}</Link>
  )

  return (
    <Subjects
      subjects={subjects}
      error={error}
      renderAddress={renderAddress}
      renderLink={renderLink}
    />
  )
}

export default SubjectsContainer
