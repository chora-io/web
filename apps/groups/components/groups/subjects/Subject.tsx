'use client'

import { Subject } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useMetadata, useSubject } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

const SubjectContainer = () => {
  const { id } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch subject from selected network
  const [subject, subjectError] = useSubject(chainInfo, `${id}`)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    subject ? subject.metadata : null,
  )

  const error = subjectError || metadataError

  const renderAddress = (address: string) => <Address address={address} />

  return (
    <Subject
      subject={subject}
      metadata={metadata}
      error={error}
      renderAddress={renderAddress}
    />
  )
}

export default SubjectContainer
