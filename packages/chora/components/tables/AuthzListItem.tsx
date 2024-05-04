'use client'

import * as React from 'react'
import { useContext } from 'react'

import { WalletContext } from '../../contexts'
import { formatTimestamp } from '../../utils'

import styles from './AuthzListItem.module.css'

const AuthzListItem = ({ grant, renderAddress }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'granter'}</h3>
        <p>
          {renderAddress ? (
            renderAddress(grant.granter)
          ) : (
            <>
              {grant.granter}
              {wallet && grant.granter === wallet.bech32Address && (
                <span className={styles.activeAccount}>
                  {'(active account)'}
                </span>
              )}
            </>
          )}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'grantee'}</h3>
        <p>
          {renderAddress ? (
            renderAddress(grant.grantee)
          ) : (
            <>
              {grant.grantee}
              {wallet && grant.grantee === wallet.bech32Address && (
                <span className={styles.activeAccount}>
                  {'(active account)'}
                </span>
              )}
            </>
          )}
        </p>
      </div>
      {grant.authorization['@type'] ===
        '/cosmos.authz.v1beta1.GenericAuthorization' && (
        <div className={styles.boxText}>
          <h3>{'message'}</h3>
          <p>{grant.authorization.msg}</p>
        </div>
      )}
      <div className={styles.boxText}>
        <h3>{'expiration'}</h3>
        <p>{formatTimestamp(grant.expiration)}</p>
      </div>
    </div>
  )
}

export default AuthzListItem
