'use client'

import { Subjects } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext, useState } from 'react'

import { useSubjects } from '@hooks/useSubjects'

const SubjectsContainer = () => {
  const { chainInfo, network } = useContext(WalletContext)

  const limit = 5

  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // fetch subjects from selected network
  const [subjects, error] = useSubjects(chainInfo, limit, offset)

  const renderLink = (subjectId: string) => (
    <Link href={`/${network}/subjects/${subjectId}`}>{'view subject'}</Link>
  )

  return (
    <Subjects
      subjects={subjects}
      error={error}
      renderLink={renderLink}
      limit={limit}
      offset={offset}
      setOffset={setOffset}
      view={view}
      setView={setView}
    />
  )
}

export default SubjectsContainer
