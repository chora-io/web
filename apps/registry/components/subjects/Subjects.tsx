'use client'

import { Result } from 'chora/components'
import { PaginationNav } from 'chora/components/tables'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import SubjectsList from '@components/subjects/SubjectsList'
import SubjectsTable from '@components/subjects/SubjectsTable'
import { useSubjects } from '@hooks/useSubjects'

import styles from './Subjects.module.css'

const Subjects = () => {
  const { chainInfo } = useContext(WalletContext)

  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // fetch subjects from selected network
  const [subjects, error] = useSubjects(chainInfo, 5, offset)

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
      {!subjects && !error && <p>{'loading...'}</p>}
      {!error && subjects && subjects.length === 0 && (
        <p>{'no subjects found'}</p>
      )}
      {subjects && subjects.length > 0 && (
        <>
          {view === 'table' ? (
            <SubjectsTable subjects={subjects} />
          ) : (
            <SubjectsList subjects={subjects} />
          )}
          <PaginationNav
            length={subjects ? subjects.length : 0}
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

export default Subjects
