'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext } from 'react'

import ClassPreview from '@components/classes/ClassPreview'
import { useClasses } from '@hooks/useClasses'

import styles from './Classes.module.css'

const Classes = () => {
  const { chainInfo } = useContext(WalletContext)

  // fetch classes (curated by coop) from selected network
  const [classes, error] = useClasses(chainInfo)

  return (
    <div className={styles.box}>
      {!error && !classes && <div>{'loading...'}</div>}
      {!error && classes && classes.length === 0 && <div>{'no credit classes found'}</div>}
      {Array.isArray(classes) &&
        classes.map((clazz) => <ClassPreview key={clazz['id']} clazz={clazz} />)}
      <Result error={error} />
    </div>
  )
}

export default Classes
