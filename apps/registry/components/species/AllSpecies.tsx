'use client'

import { PaginationNav, Result } from 'chora/components'
import { useState } from 'react'

import SpeciesList from '@components/species/SpeciesList'
import SpeciesTable from '@components/species/SpeciesTable'

import styles from './AllSpecies.module.css'

const AllSpecies = () => {
  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // TODO: fetch species from selected network
  const species: any[] = []
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
      {!species && !error && <p>{'loading...'}</p>}
      {!error && species && species.length === 0 && <p>{'no species found'}</p>}
      {species && species.length > 0 && (
        <>
          {view === 'table' ? (
            <SpeciesTable species={species} />
          ) : (
            <SpeciesList species={species} />
          )}
          <PaginationNav
            length={species ? species.length : 0}
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

export default AllSpecies
