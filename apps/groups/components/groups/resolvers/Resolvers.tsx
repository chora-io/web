'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext } from 'react'

import { GroupContext } from '@contexts/GroupContext'
import { useGroupResolvers } from '@hooks/useGroupResolvers'
import ResolverPreview from './ResolverPreview'

import styles from './Resolvers.module.css'

const Resolvers = () => {
  const { policies, policiesError } = useContext(GroupContext)
  const { chainInfo } = useContext(WalletContext)

  // fetch data resolvers from selected network
  const [resolvers, resolversError] = useGroupResolvers(chainInfo, policies)

  const error = policiesError || resolversError

  return (
    <div className={styles.box}>
      {!error && !resolvers && <div>{'loading...'}</div>}
      {Array.isArray(resolvers) &&
        resolvers.map((resolver) => (
          <ResolverPreview key={resolver['id']} resolver={resolver} />
        ))}
      {!error && chainInfo?.chainId && resolvers?.length === 0 && (
        <div>{'no resolvers found'}</div>
      )}
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Resolvers
