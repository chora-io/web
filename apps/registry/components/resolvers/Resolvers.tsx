'use client'

import { PaginationNav, Result } from 'chora/components'
import { useState } from 'react'

import ResolversList from '@components/resolvers/ResolversList'
import ResolversTable from '@components/resolvers/ResolversTable'

import styles from './Resolvers.module.css'

const Resolvers = () => {
  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // TODO: fetch resolvers from selected network
  const resolvers: any[] = []
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
      {!resolvers && !error && <p>{'loading...'}</p>}
      {!error && resolvers && resolvers.length === 0 && (
        <p>{'no resolvers found'}</p>
      )}
      {resolvers && resolvers.length > 0 && (
        <>
          {view === 'table' ? (
            <ResolversTable resolvers={resolvers} />
          ) : (
            <ResolversList resolvers={resolvers} />
          )}
          <PaginationNav
            length={resolvers ? resolvers.length : 0}
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

export default Resolvers
