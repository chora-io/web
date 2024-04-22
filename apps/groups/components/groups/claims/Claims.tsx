'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext } from 'react'

import ClaimPreview from '@components/groups/claims/ClaimPreview'
import { GroupContext } from '@contexts/GroupContext'
import { useGroupAttestations } from '@hooks/useGroupAttestations'

import styles from './Claims.module.css'

const Claims = () => {
  const { policies, policiesError } = useContext(GroupContext)
  const { chainInfo } = useContext(WalletContext)

  // fetch credit claims administered by group from selected network
  const [claims, claimsError] = useGroupAttestations(chainInfo, policies)

  const error = policiesError || claimsError

  return (
    <div className={styles.box}>
      {!error && !claims && <div>{'loading...'}</div>}
      {!error && claims && claims.length === 0 && (
        <div>{'no claims found'}</div>
      )}
      {Array.isArray(claims) &&
        claims.map((claim) => (
          <ClaimPreview key={claim['iri']} claim={claim} />
        ))}
      <Result error={error} />
    </div>
  )
}

export default Claims
