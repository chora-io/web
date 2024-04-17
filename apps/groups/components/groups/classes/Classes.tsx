'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import ClassPreview from '@components/groups/classes/ClassPreview'
import { useGroupClasses } from '@hooks/useGroupClasses'

import styles from './Classes.module.css'

const Classes = () => {
  const { groupId } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch credit classes administered by group from selected network
  const [classes, error] = useGroupClasses(chainInfo, groupId)

  return (
    <div className={styles.box}>
      {!error && !classes && <div>{'loading...'}</div>}
      {!error && classes && classes.length === 0 && (
        <div>{'no classes found'}</div>
      )}
      {Array.isArray(classes) &&
        classes.map((clazz) => (
          <ClassPreview key={clazz['id']} clazz={clazz} />
        ))}
      <Result error={error} />
    </div>
  )
}

export default Classes
