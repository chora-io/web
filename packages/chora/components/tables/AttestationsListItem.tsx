'use client'

import * as React from 'react'
import { useContext } from 'react'

import { WalletContext } from '../../contexts'
import { formatTimestamp } from '../../utils'

import styles from './AttestationsListItem.module.css'

const AttestationsListItem = ({
  attestation,
  renderAddress,
  renderLink,
}: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'iri'}</h3>
        <p>{attestation.iri}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'timestamp'}</h3>
        <p>{formatTimestamp(attestation.timestamp)}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'attestor'}</h3>
        <p>
          {renderAddress ? (
            renderAddress(attestation.attestor)
          ) : (
            <>
              {attestation.attestor}
              {wallet && attestation.attestor === wallet.bech32Address && (
                <span className={styles.activeAccount}>
                  {'(active account)'}
                </span>
              )}
            </>
          )}
        </p>
      </div>
      {renderLink && renderLink(attestation.iri)}
    </div>
  )
}

export default AttestationsListItem
