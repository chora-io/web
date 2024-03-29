'use client'

import { PaginationNav, Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import BasketsList from '@components/baskets/BasketsList'
import BasketsTable from '@components/baskets/BasketsTable'
import { useBaskets } from '@hooks/useBaskets'

import styles from './Baskets.module.css'

const Baskets = () => {
  const { chainInfo } = useContext(WalletContext)

  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // fetch baskets from selected network
  const [baskets, error] = useBaskets(chainInfo, 5, offset)

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
      {!baskets && !error && <p>{'loading...'}</p>}
      {baskets && baskets.length === 0 && <p>{'no baskets found'}</p>}
      {baskets && baskets.length > 0 && (
        <>
          {view === 'table' ? (
            <BasketsTable baskets={baskets} />
          ) : (
            <BasketsList baskets={baskets} />
          )}
          <PaginationNav
            length={baskets ? baskets.length : 0}
            maxLength={5}
            offset={offset}
            setOffset={setOffset}
          />
        </>
      )}
      <Result error={error} />
    </div>
  )
}

export default Baskets
