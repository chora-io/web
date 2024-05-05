'use client'

import { ServerContext } from 'chora/contexts'
import { useContext } from 'react'

import styles from './Dashboard.module.css'

const Dashboard = () => {
  const { account } = useContext(ServerContext)

  if (!account) {
    return (
      <div className={styles.box}>
        <div className={styles.boxText}>
          <p>{'Account required to access dashboard.'}</p>
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
