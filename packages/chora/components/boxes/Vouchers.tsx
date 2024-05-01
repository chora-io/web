'use client'

import * as React from 'react'

import { Result } from '..'
import { PaginationNav, VouchersList, VouchersTable } from '../tables'

import styles from './Vouchers.module.css'

const Vouchers = ({
  vouchers,
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
      {!error && !vouchers && <div>{'loading...'}</div>}
      {!error && vouchers && vouchers.length === 0 && (
        <div>{'no vouchers found'}</div>
      )}
      {vouchers && vouchers.length > 0 && (
        <>
          <div className={styles.allowOverflow}>
            {view === 'table' ? (
              <VouchersTable
                vouchers={vouchers}
                renderAddress={renderAddress}
                renderLink={renderLink}
              />
            ) : (
              <VouchersList
                vouchers={vouchers}
                renderAddress={renderAddress}
                renderLink={renderLink}
              />
            )}
          </div>
          {limit && (
            <PaginationNav
              length={vouchers ? vouchers.length : 0}
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

export default Vouchers
