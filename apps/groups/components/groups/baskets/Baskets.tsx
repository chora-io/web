'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext } from 'react'

import BasketPreview from '@components/groups/baskets/BasketPreview'
import { GroupContext } from '@contexts/GroupContext'
import { useGroupBaskets } from '@hooks/useGroupBaskets'

import styles from './Baskets.module.css'

const Baskets = () => {
  const { policies, policiesError } = useContext(GroupContext)
  const { chainInfo } = useContext(WalletContext)

  // fetch credit baskets curated by group from selected network
  const [baskets, basketsError] = useGroupBaskets(chainInfo, policies)

  const error = policiesError || basketsError

  return (
    <div className={styles.box}>
      {!error && !baskets && <div>{'loading...'}</div>}
      {!error && baskets && baskets.length === 0 && (
        <div>{'no baskets found'}</div>
      )}
      {Array.isArray(baskets) &&
        baskets.map((basket) => (
          <BasketPreview key={basket['denom']} basket={basket} />
        ))}
      <Result error={error} />
    </div>
  )
}

export default Baskets
