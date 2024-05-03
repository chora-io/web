'use client'

import * as React from 'react'

import { FeegrantListItem } from '../tables'
import { Result } from '..'

import styles from './Feegrant.module.css'

const Feegrant = ({
  feeGrantee,
  feeGranter,
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
      {!error && !feeGrantee && !feeGranter && <div>{'loading...'}</div>}
      {filter === 'grantee' && (
        <div>
          {Array.isArray(feeGrantee) &&
            feeGrantee.map((grant, i) => (
              <FeegrantListItem
                key={i}
                grant={grant}
                renderAddress={renderAddress}
              />
            ))}
          {feeGrantee && feeGrantee.length === 0 && (
            <div>{'no fee allowances granted to this account'}</div>
          )}
        </div>
      )}
      {filter === 'granter' && (
        <div>
          {Array.isArray(feeGranter) &&
            feeGranter.map((allowance, i) => (
              <FeegrantListItem
                key={i}
                allowance={allowance}
                renderAddress={renderAddress}
              />
            ))}
          {feeGranter && feeGranter.length === 0 && (
            <div>{'no fee allowances granted by this account'}</div>
          )}
        </div>
      )}
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Feegrant
