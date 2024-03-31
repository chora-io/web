'use client'

import { PaginationNav, Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import BatchesList from '@components/batches/BatchesList'
import BatchesTable from '@components/batches/BatchesTable'
import { useBatches } from '@hooks/useBatches'

import styles from './Batches.module.css'

const Batches = () => {
  const { chainInfo } = useContext(WalletContext)

  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // fetch credit batches from selected network
  const [batches, error] = useBatches(chainInfo, 5, offset)

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
            <BatchesTable batches={batches} />
          ) : (
            <BatchesList batches={batches} />
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

export default Batches
