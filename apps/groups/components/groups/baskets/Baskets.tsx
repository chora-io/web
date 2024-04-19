'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import BasketPreview from '@components/groups/baskets/BasketPreview'
import { useGroupBaskets } from '@hooks/useGroupBaskets'

import styles from './Baskets.module.css'

const Baskets = () => {
  const { groupId } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch credit baskets administered by group from selected network
  const [baskets, error] = useGroupBaskets(chainInfo, groupId)

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
