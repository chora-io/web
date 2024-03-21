'use client'

import { PaginationNav, Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import CreditsList from '@components/credits/CreditsList'
import CreditsTable from '@components/credits/CreditsTable'
import { useCredits } from '@hooks/useCredits'

import styles from './Credits.module.css'

const Credits = () => {
  const { chainInfo } = useContext(WalletContext)

  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // fetch batches from selected network
  const [batches, error] = useCredits(chainInfo, 5, offset)

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
      {!batches && !error && <p>{'loading...'}</p>}
      {batches && batches.length === 0 && <p>{'no batches found'}</p>}
      {batches && batches.length > 0 && (
        <>
          {view === 'table' ? (
            <CreditsTable batches={batches} />
          ) : (
            <CreditsList batches={batches} />
          )}
          <PaginationNav
            length={batches ? batches.length : 0}
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

export default Credits
