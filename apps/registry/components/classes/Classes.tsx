'use client'

import { Result } from 'chora/components'
import { PaginationNav } from 'chora/components/tables'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import ClassesList from '@components/classes/ClassesList'
import ClassesTable from '@components/classes/ClassesTable'
import { useClasses } from '@hooks/useClasses'

import styles from './Classes.module.css'

const Classes = () => {
  const { chainInfo } = useContext(WalletContext)

  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // fetch classes from selected network
  const [classes, error] = useClasses(chainInfo, 5, offset)

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
      {!classes && !error && <p>{'loading...'}</p>}
      {!error && classes && classes.length === 0 && <p>{'no classes found'}</p>}
      {classes && classes.length > 0 && (
        <>
          {view === 'table' ? (
            <ClassesTable classes={classes} />
          ) : (
            <ClassesList classes={classes} />
          )}
          <PaginationNav
            length={classes ? classes.length : 0}
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

export default Classes
