'use client'

import { PaginationNav, Result } from 'chora/components'
import { useState } from 'react'

import HabitatsList from '@components/habitats/HabitatsList'
import HabitatsTable from '@components/habitats/HabitatsTable'

import styles from './Habitats.module.css'

const Habitats = () => {
  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // TODO: fetch habitats from selected network
  const habitats: any[] = []
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
      {!habitats && !error && <p>{'loading...'}</p>}
      {!error && habitats && habitats.length === 0 && (
        <p>{'no habitats found'}</p>
      )}
      {habitats && habitats.length > 0 && (
        <>
          {view === 'table' ? (
            <HabitatsTable habitats={habitats} />
          ) : (
            <HabitatsList habitats={habitats} />
          )}
          <PaginationNav
            length={habitats ? habitats.length : 0}
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

export default Habitats
