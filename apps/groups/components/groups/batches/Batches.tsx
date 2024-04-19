'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import BatchPreview from '@components/groups/batches/BatchPreview'
import { useGroupBatches } from '@hooks/useGroupBatches'

import styles from './Batches.module.css'

const Batches = () => {
  const { groupId } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch credit batches administered by group from selected network
  const [batches, error] = useGroupBatches(chainInfo, groupId)

  return (
    <div className={styles.box}>
      {!error && !batches && <div>{'loading...'}</div>}
      {!error && batches && batches.length === 0 && (
        <div>{'no batches found'}</div>
      )}
      {Array.isArray(batches) &&
        batches.map((batch) => (
          <BatchPreview key={batch['denom']} batch={batch} />
        ))}
      <Result error={error} />
    </div>
  )
}

export default Batches
