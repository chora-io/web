'use client'

import { Result } from 'chora/components'
import { PaginationNav } from 'chora/components/tables'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import GroupsList from '@components/groups/GroupsList'
import GroupsTable from '@components/groups/GroupsTable'
import { useGroups } from '@hooks/useGroups'

import styles from './Groups.module.css'

const Groups = () => {
  const { chainInfo } = useContext(WalletContext)

  const limit = 5

  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // fetch groups from selected network
  const [groups, error] = useGroups(chainInfo, limit, offset)

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
      {!error && !groups && (
        <div className={styles.boxText}>{'loading...'}</div>
      )}
      {!error && groups && groups.length === 0 && offset === 0 && (
        <div className={styles.boxText}>{'no groups found'}</div>
      )}
      {((groups && groups.length > 0) || offset > 0) && (
        <>
          {view === 'table' ? (
            <GroupsTable groups={groups} />
          ) : (
            <GroupsList groups={groups} />
          )}
          {limit && (
            <PaginationNav
              length={groups ? groups.length : 0}
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

export default Groups
