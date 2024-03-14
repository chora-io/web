'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext } from 'react'

import CreditPreview from '@components/credits/CreditPreview'
import { useCredits } from '@hooks/useCredits'

import styles from './Credits.module.css'

const Credits = () => {
  const { chainInfo } = useContext(WalletContext)

  // fetch batches (curated by coop) from selected network
  const [batches, error] = useCredits(chainInfo)

  return (
    <div className={styles.box}>
      {!error && !batches && <div>{'loading...'}</div>}
      {!error && batches && batches.length === 0 && <div>{'no credit batches found'}</div>}
      {Array.isArray(batches) &&
        batches.map((batch) => <CreditPreview key={batch['denom']} batch={batch} />)}
      <Result error={error} />
    </div>
  )
}

export default Credits
