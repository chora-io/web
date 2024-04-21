'use client'

import { PaginationNav, Result } from 'chora/components'
import { useState } from 'react'

import VerifiersList from '@components/verifiers/VerifiersList'
import VerifiersTable from '@components/verifiers/VerifiersTable'

import styles from './Verifiers.module.css'

const Verifiers = () => {
  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // TODO: fetch verifiers from selected network
  const verifiers: any[] = []
  const error = null

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
      {!verifiers && !error && <p>{'loading...'}</p>}
      {!error && verifiers && verifiers.length === 0 && (
        <p>{'no verifiers found'}</p>
      )}
      {verifiers && verifiers.length > 0 && (
        <>
          {view === 'table' ? (
            <VerifiersTable verifiers={verifiers} />
          ) : (
            <VerifiersList verifiers={verifiers} />
          )}
          <PaginationNav
            length={verifiers ? verifiers.length : 0}
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

export default Verifiers
