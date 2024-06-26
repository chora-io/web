'use client'

import { ServerContext } from 'chora/contexts'
import { useContext } from 'react'

import styles from './Documents.module.css'

const Documents = () => {
  const { account } = useContext(ServerContext)

  if (!account) {
    return (
      <div className={styles.box}>
        <div className={styles.boxText}>
          <p>{'Account required to manage documents.'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <p>{'Create and manage documents for group governance processes.'}</p>
      </div>
    </div>
  )
}

export default Documents
