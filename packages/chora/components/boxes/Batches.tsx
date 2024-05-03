'use client'

import * as React from 'react'

import { Result } from '..'
import { BatchesList, BatchesTable, PaginationNav } from '../tables'

import styles from './Batches.module.css'

const Batches = ({
  batches,
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
      {!batches && !error && <div>{'loading...'}</div>}
      {!error && batches && batches.length === 0 && (
        <div>{'no batches found'}</div>
      )}
      {batches && batches.length > 0 && (
        <>
          {view === 'table' ? (
            <BatchesTable
              batches={batches}
              renderAddress={renderAddress}
              renderLink={renderLink}
            />
          ) : (
            <BatchesList
              batches={batches}
              renderAddress={renderAddress}
              renderLink={renderLink}
            />
          )}
          {limit && (
            <PaginationNav
              length={batches ? batches.length : 0}
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

export default Batches
