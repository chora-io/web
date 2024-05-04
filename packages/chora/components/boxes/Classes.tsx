'use client'

import * as React from 'react'

import { Result } from '..'
import { ClassesList, ClassesTable, PaginationNav } from '../tables'

import styles from './Classes.module.css'

const Classes = ({
  classes,
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
      {!classes && !error && (
        <div className={styles.boxText}>{'loading...'}</div>
      )}
      {!error && classes && classes.length === 0 && (
        <div className={styles.boxText}>{'no classes found'}</div>
      )}
      {classes && classes.length > 0 && (
        <>
          {view === 'table' ? (
            <ClassesTable
              classes={classes}
              renderAddress={renderAddress}
              renderLink={renderLink}
            />
          ) : (
            <ClassesList
              classes={classes}
              renderAddress={renderAddress}
              renderLink={renderLink}
            />
          )}
          {limit && (
            <PaginationNav
              length={classes ? classes.length : 0}
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

export default Classes
