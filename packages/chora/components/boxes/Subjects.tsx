'use client'

import * as React from 'react'

import { Result } from '..'
import { PaginationNav, SubjectsList, SubjectsTable } from '../tables'

import styles from './Subjects.module.css'

const Subjects = ({
  subjects,
  error,
  renderAddress,
  renderLink,
  limit,
  offset,
  setOffset,
  view,
  setView,
}: any) => {
  return (
    <div className={styles.box}>
      {view && setView && (
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
      )}
      {!error && !subjects && (
        <div className={styles.boxText}>{'loading...'}</div>
      )}
      {!error && subjects && subjects.length === 0 && offset === 0 && (
        <div className={styles.boxText}>{'no subjects found'}</div>
      )}
      {((subjects && subjects.length > 0) || offset > 0) && (
        <>
          {view === 'table' ? (
            <SubjectsTable
              subjects={subjects}
              renderAddress={renderAddress}
              renderLink={renderLink}
            />
          ) : (
            <SubjectsList
              subjects={subjects}
              renderAddress={renderAddress}
              renderLink={renderLink}
            />
          )}
          {limit && (
            <PaginationNav
              length={subjects ? subjects.length : 0}
              limit={limit}
              offset={offset}
              setOffset={setOffset}
            />
          )}
        </>
      )}
      <Result error={error} />
    </div>
  )
}

export default Subjects
