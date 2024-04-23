'use client'

import { Result } from 'chora/components'
import { PaginationNav } from 'chora/components/tables'
import { useState } from 'react'

import MonitorsList from '@components/monitors/MonitorsList'
import MonitorsTable from '@components/monitors/MonitorsTable'

import styles from './Monitors.module.css'

const Monitors = () => {
  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // TODO: fetch monitors from selected network
  const monitors: any[] = []
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
      {!monitors && !error && <p>{'loading...'}</p>}
      {!error && monitors && monitors.length === 0 && (
        <p>{'no monitors found'}</p>
      )}
      {monitors && monitors.length > 0 && (
        <>
          {view === 'table' ? (
            <MonitorsTable monitors={monitors} />
          ) : (
            <MonitorsList monitors={monitors} />
          )}
          <PaginationNav
            length={monitors ? monitors.length : 0}
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

export default Monitors
