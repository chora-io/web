'use client'

import { AuthContext } from 'chora/contexts'
import { useContext } from 'react'

import styles from './Auth.module.css'

const Auth = () => {
  const { account } = useContext(AuthContext)

  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'account information'}</h2>
        <p>{'authenticated user information'}</p>
      </div>
      <div className={styles.boxItem}>
        <div className={styles.boxText}>
          <h3>{'authenticated'}</h3>
          <p>{account ? 'true' : 'false'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'id'}</h3>
          <p>{(account && account.id) || 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'address'}</h3>
          <p>{(account && account.address) || 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'email'}</h3>
          <p>{(account && account.email) || 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'username'}</h3>
          <p>{(account && account.username) || 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'created at'}</h3>
          <p>{(account && account['created_at']) || 'NA'}</p>
        </div>
      </div>
    </div>
  )
}

export default Auth
