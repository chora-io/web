'use client'

import { AccountContext, WalletContext } from 'chora/contexts'
import { useContext, useEffect, useState } from 'react'

import AuthzGrant from './AuthzGrant'

import styles from './Authz.module.css'

const Authz = () => {
  const {
    authzGrantee,
    authzGranter,
    authzError: error,
  } = useContext(AccountContext)
  const { chainInfo, wallet } = useContext(WalletContext)

  // view options
  const [filter, setFilter] = useState<string>('grantee')

  // reset state on address or network change
  useEffect(() => {
    setFilter('grantee')
  }, [chainInfo?.rest, wallet?.bech32Address])

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
      {!error && !authzGrantee && !authzGranter && <div>{'loading...'}</div>}
      {filter === 'grantee' && (
        <div>
          {Array.isArray(authzGrantee) &&
            authzGrantee.map((grant, i) => (
              <AuthzGrant key={i} grant={grant} />
            ))}
          {authzGrantee && authzGrantee.length === 0 && (
            <div>{'no authorizations granted to this account'}</div>
          )}
        </div>
      )}
      {filter === 'granter' && (
        <div>
          {Array.isArray(authzGranter) &&
            authzGranter.map((grant, i) => (
              <AuthzGrant key={i} grant={grant} />
            ))}
          {authzGranter && authzGranter.length === 0 && (
            <div>{'no authorizations granted by this account'}</div>
          )}
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  )
}

export default Authz
