'use client'

import CreditsListItem from '@components/credits/CreditsListItem'

const CreditsList = ({ batches }: any) => {
  return (
    <>
      {batches &&
        batches.map((batch: any) => (
          <CreditsListItem key={batch.denom} batch={batch} />
        ))}
    </>
  )
}

export default CreditsList
