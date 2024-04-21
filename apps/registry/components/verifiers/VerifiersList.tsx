'use client'

import VerifiersListItem from '@components/verifiers/VerifiersListItem'

const VerifiersList = ({ verifiers }: any) => {
  return (
    <>
      {verifiers &&
        verifiers.map((verifier: any) => (
          <VerifiersListItem key={verifier.id} verifier={verifier} />
        ))}
    </>
  )
}

export default VerifiersList
