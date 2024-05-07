'use client'

import * as React from 'react'

import { Result } from '..'
import { BasketsTable, BasketsList, PaginationNav } from '../tables'

import styles from './Baskets.module.css'

const Baskets = ({
  baskets,
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
      {!baskets && !error && (
        <div className={styles.boxText}>{'loading...'}</div>
      )}
      {!error && baskets && baskets.length === 0 && offset === 0 && (
        <div className={styles.boxText}>{'no baskets found'}</div>
      )}
      {((baskets && baskets.length > 0) || offset > 0) && (
        <>
          {view === 'table' ? (
            <BasketsTable
              baskets={baskets}
              renderAddress={renderAddress}
              renderLink={renderLink}
            />
          ) : (
            <BasketsList
              baskets={baskets}
              renderAddress={renderAddress}
              renderLink={renderLink}
            />
          )}
          {limit && (
            <PaginationNav
              length={baskets ? baskets.length : 0}
              limit={limit}
              offset={offset}
              setOffset={setOffset}
            />
          )}
        </>
      )}
      <Result error={error} />
    </div>
  )
}

export default Baskets
