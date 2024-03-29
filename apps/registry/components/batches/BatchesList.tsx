'use client'

import BatchesListItem from '@components/batches/BatchesListItem'

const BatchesList = ({ batches }: any) => {
  return (
    <>
      {batches &&
        batches.map((batch: any) => (
          <BatchesListItem key={batch.denom} batch={batch} />
        ))}
    </>
  )
}

export default BatchesList
