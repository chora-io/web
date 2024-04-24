'use client'

import { Result } from 'chora/components'
import { PaginationNav } from 'chora/components/tables'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import VouchersList from '@components/vouchers/VouchersList'
import VouchersTable from '@components/vouchers/VouchersTable'
import { useVouchers } from '@hooks/useVouchers'

import styles from './Vouchers.module.css'

const Vouchers = () => {
  const { chainInfo } = useContext(WalletContext)

  const limit = 5

  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // fetch vouchers from selected network
  const [vouchers, error] = useVouchers(chainInfo, limit, offset)

  return (
    <div className={styles.box}>
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
      {!vouchers && !error && <p>{'loading...'}</p>}
      {!error && vouchers && vouchers.length === 0 && (
        <p>{'no vouchers found'}</p>
      )}
      {vouchers && vouchers.length > 0 && (
        <>
          {view === 'table' ? (
            <VouchersTable vouchers={vouchers} />
          ) : (
            <VouchersList vouchers={vouchers} />
          )}
          <PaginationNav
            length={vouchers ? vouchers.length : 0}
            limit={limit}
            offset={offset}
            setOffset={setOffset}
          />
        </>
      )}
      <Result error={error} />
    </div>
  )
}

export default Vouchers
