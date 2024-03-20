'use client'

import { WalletContext } from 'chora/contexts'
import { Result } from 'chora/components'
import { useContext } from 'react'

import GroupPreview from '@components/groups/GroupPreview'
import { useGroups } from '@hooks/useGroups'

import styles from './Groups.module.css'

const Groups = () => {
  const { chainInfo } = useContext(WalletContext)

  // fetch groups from selected network
  const [groups, error] = useGroups(chainInfo)

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        {!groups && !error && 'loading...'}
        {groups &&
          groups.map((group: any) => (
            <GroupPreview key={group.id} group={group} />
          ))}
      </div>
      <Result error={error} />
    </div>
  )
}

export default Groups
