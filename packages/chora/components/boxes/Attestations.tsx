'use client'

import * as React from 'react'

import { Result } from '..'
import { AttestationsListItem, PaginationNav } from '../tables'

import styles from './Attestations.module.css'

const Attestations = ({
  attestations,
  error,
  renderAddress,
  renderLink,
  limit,
  offset,
  setOffset,
  view,
  setView,
}: any) => {
  return (
    <div className={styles.box}>
      {view && setView && (
        <div className={styles.boxOptions}>
          <button
            className={view === 'table' ? styles.active : undefined}
            onClick={() => setView('table')}
          >
            {'table view'}
          </button>
          <button
            className={view === 'list' ? styles.active : undefined}
            onClick={() => setView('list')}
          >
            {'list view'}
          </button>
        </div>
      )}
      {!error && !attestations && <div>{'loading...'}</div>}
      {!error && attestations && attestations.length === 0 && (
        <div>{'no attestations found'}</div>
      )}
      {attestations && attestations.length > 0 && (
        <>
          {attestations.map((attestation: any) => (
            <AttestationsListItem
              key={attestation['iri']}
              attestation={attestation}
              renderAddress={renderAddress}
              renderLink={renderLink}
            />
          ))}
          {limit && (
            <PaginationNav
              length={attestations ? attestations.length : 0}
              limit={limit}
              offset={offset}
              setOffset={setOffset}
            />
          )}
        </>
      )}
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Attestations
