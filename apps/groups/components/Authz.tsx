'use client'

import { WalletContext } from 'chora/contexts'
import { useAuthzGrants } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

import AuthzGrant from '@components/AuthzGrant'

import styles from './Authz.module.css'

const Authz = () => {
  const { address } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch authz grants by address from selected network
  const [grantsGrantee, grantsGranter, error] = useAuthzGrants(
    chainInfo,
    `${address}`,
  )

  // view options
  const [filter, setFilter] = useState<string>('grantee')

  // reset state on address or network change
  useEffect(() => {
    setFilter('grantee')
  }, [address, chainInfo?.chainId])

  return (
    <div className={styles.box}>
      <div className={styles.boxOptions}>
        <button
          className={filter === 'grantee' ? styles.boxOptionActive : undefined}
          onClick={() => setFilter('grantee')}
        >
          {'grantee'}
        </button>
        <button
          className={filter === 'granter' ? styles.boxOptionActive : undefined}
          onClick={() => setFilter('granter')}
        >
          {'granter'}
        </button>
      </div>
      {!error && !grantsGrantee && !grantsGranter && <div>{'loading...'}</div>}
      {filter === 'grantee' && (
        <div>
          {Array.isArray(grantsGrantee) &&
            grantsGrantee.map((grant, i) => (
              <AuthzGrant key={i} grant={grant} />
            ))}
          {grantsGrantee && grantsGrantee.length === 0 && (
            <div>{'no authorizations granted to this account'}</div>
          )}
        </div>
      )}
      {filter === 'granter' && (
        <div>
          {Array.isArray(grantsGranter) &&
            grantsGranter.map((grant, i) => (
              <AuthzGrant key={i} grant={grant} />
            ))}
          {grantsGranter && grantsGranter.length === 0 && (
            <div>{'no authorizations granted by this account'}</div>
          )}
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  )
}

export default Authz
