'use client'

import { PaginationNav, Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import GroupsList from '@components/groups/GroupsList'
import GroupsTable from '@components/groups/GroupsTable'
import { useGroups } from '@hooks/useGroups'

import styles from './Groups.module.css'

const Groups = () => {
  const { chainInfo } = useContext(WalletContext)

  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // fetch groups from selected network
  const [groups, error] = useGroups(chainInfo, 5, offset)

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
      {!groups && !error && <p>{'loading...'}</p>}
      {groups && groups.length === 0 && <p>{'no groups found'}</p>}
      {groups && groups.length > 0 && (
        <>
          {view === 'table' ? (
            <GroupsTable groups={groups} />
          ) : (
            <GroupsList groups={groups} />
          )}
          <PaginationNav
            length={groups ? groups.length : 0}
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

export default Groups
