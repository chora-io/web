'use client'

import * as React from 'react'

import { AuthzListItem } from '../tables'
import { Result } from '..'

import styles from './Authz.module.css'

const Authz = ({
  authzGrantee,
  authzGranter,
  error,
  filter,
  setFilter,
  renderAddress,
}: any) => {
  return (
    <div className={styles.box}>
      <div className={styles.boxOptions}>
        <button
          className={filter === 'grantee' ? styles.active : undefined}
          onClick={() => setFilter('grantee')}
        >
          {'grantee'}
        </button>
        <button
          className={filter === 'granter' ? styles.active : undefined}
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
              <AuthzListItem
                key={i}
                grant={grant}
                renderAddress={renderAddress}
              />
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
              <AuthzListItem
                key={i}
                grant={grant}
                renderAddress={renderAddress}
              />
            ))}
          {authzGranter && authzGranter.length === 0 && (
            <div>{'no authorizations granted by this account'}</div>
          )}
        </div>
      )}
      <Result error={error} />
    </div>
  )
}

export default Authz
