'use client'

import { Subject } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useSubject } from '@hooks/useSubject'

const SubjectContainer = () => {
  const { id } = useParams()
  const { chainInfo, network } = useContext(WalletContext)

  // fetch subject from selected network
  const [subject, subjectError] = useSubject(chainInfo, `${id}`)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    subject ? subject.metadata : null,
  )

  const error = subjectError || metadataError

  const renderMetadata = (metadata: string) => (
    <Link href={`/${network}/claims/${metadata}`}>{metadata}</Link>
  )

  return (
    <Subject
      subject={subject}
      metadata={metadata}
      error={error}
      renderMetadata={renderMetadata}
    />
  )
}

export default SubjectContainer
