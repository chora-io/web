'use client'

import { WalletContext } from 'chora/contexts'
import { Result } from 'chora/components'
import { useContext, useState } from 'react'

import GroupsTable from '@components/groups/GroupsTable'
import { useGroups } from '@hooks/useGroups'

import styles from './Groups.module.css'

const Groups = () => {
  const { chainInfo } = useContext(WalletContext)

  const [offset, setOffset] = useState(0)

  // fetch groups from selected network
  const [groups, error] = useGroups(chainInfo, 5, offset)

  const pageNumber = () => {
    return offset / 5 + 1
  }

  return (
    <div className={styles.box}>
      {!groups && !error ? (
        <p style={{ margin: '2em' }}>{'loading...'}</p>
      ) : (
        <GroupsTable groups={groups} />
      )}
      <div className={styles.navigation}>
        {offset > 0 && (
          <button
            className={styles.button}
            onClick={() => setOffset(offset - 5)}
          >
            {'prev page'}
          </button>
        )}
        <span>{'page ' + pageNumber()}</span>
        {groups && groups.length === 5 && (
          <button
            className={styles.button}
            onClick={() => setOffset(offset + 5)}
          >
            {'next page'}
          </button>
        )}
      </div>
      <Result error={error} />
    </div>
  )
}

export default Groups
