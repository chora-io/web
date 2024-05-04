'use client'

import * as React from 'react'
import { useContext } from 'react'

import { WalletContext } from '../../contexts'
import { formatTimestamp } from '../../utils'

import styles from './FeegrantListItem.module.css'

const FeegrantListItem = ({ grant, renderAddress }: any) => {
  const { wallet } = useContext(WalletContext)
  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'granter'}</h3>
        {renderAddress ? (
          renderAddress(grant.granter)
        ) : (
          <>
            {grant.granter}
            {wallet && grant.granter === wallet.bech32Address && (
              <span className={styles.activeAccount}>{'(active account)'}</span>
            )}
          </>
        )}
      </div>
      <div className={styles.boxText}>
        <h3>{'grantee'}</h3>
        {renderAddress ? (
          renderAddress(grant.grantee)
        ) : (
          <>
            {grant.grantee}
            {wallet && grant.grantee === wallet.bech32Address && (
              <span className={styles.activeAccount}>{'(active account)'}</span>
            )}
          </>
        )}
      </div>
      {grant.grant['@type'] ===
        '/cosmos.feegrant.v1beta1.BasicAllowance' && (
        <>
          {grant.grant['spend_limit'].map((token: any, i: number) => (
            <div className={styles.boxText} key={i}>
              <h3>{'spend limit'}</h3>
              <p>{token.amount + token.denom}</p>
            </div>
          ))}
          <div className={styles.boxText}>
            <h3>{'expiration'}</h3>
            <p>{formatTimestamp(grant.grant.expiration)}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default FeegrantListItem
