'use client'

import { AuthContext } from 'chora/contexts'
import { useContext } from 'react'

import styles from './Dashboard.module.css'

const Dashboard = () => {
  const { account } = useContext(AuthContext)

  if (!account) {
    return (
      <div className={styles.box}>
        <div className={styles.boxText}>
          <p>{'Account required to access workspace dashboard.'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <p>{'A dashboard for workspace workflows and documents.'}</p>
      </div>
    </div>
  )
}

export default Dashboard
