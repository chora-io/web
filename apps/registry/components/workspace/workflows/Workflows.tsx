'use client'

import { AuthContext } from 'chora/contexts'
import { useContext } from 'react'

import styles from './Workflows.module.css'

const Workflows = () => {
  const { account } = useContext(AuthContext)

  if (!account) {
    return (
      <div className={styles.box}>
        <div className={styles.boxText}>
          <p>{'Account required to create and manage workflows.'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <p>
          {'Create and manage workflows for ecological registry processes.'}
        </p>
      </div>
    </div>
  )
}

export default Workflows
