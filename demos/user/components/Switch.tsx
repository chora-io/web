'use client'

import { Result } from 'chora/components'
import { ServerContext } from 'chora/contexts'
import { useContext } from 'react'

import styles from './Switch.module.css'

const Switch = () => {
  const {
    activeAccount,
    activeAccounts,
    error,
    removeAccount,
    removeAccounts,
    removeAccountFromAccounts,
    switchAccount,
  } = useContext(ServerContext)

  const handleRemoveAccountFromList = (id: string) => {
    // only remove active account if selected
    if (activeAccount && activeAccount.id === id) {
      removeAccount()
    }

    // remove account from list of accounts
    removeAccountFromAccounts(id)
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'manage accounts'}</h2>
        <p>{'authenticated user accounts'}</p>
      </div>
      {(!activeAccounts || activeAccounts.length === 0) && (
        <div className={styles.boxItem}>
          <div className={styles.boxText}>{'no accounts detected'}</div>
        </div>
      )}
      {activeAccounts &&
        activeAccounts.map((ca: any) => (
          <div className={styles.boxItem} key={ca.id}>
            <div className={styles.boxText}>
              <h3>{'id'}</h3>
              <p>{ca.id}</p>
            </div>
            {!activeAccount || activeAccount.id !== ca.id ? (
              <button
                className={styles.button}
                onClick={() => switchAccount(ca)}
              >
                {'select account'}
              </button>
            ) : (
              <button className={styles.button} onClick={removeAccount}>
                {'deselect account'}
              </button>
            )}
            <button
              className={styles.button}
              onClick={() => handleRemoveAccountFromList(ca.id)}
            >
              {'remove account from list'}
            </button>
          </div>
        ))}
      {activeAccounts && activeAccounts.length > 0 && (
        <div className={styles.boxItem}>
          <button className={styles.button} onClick={removeAccounts}>
            {'remove all accounts from list'}
          </button>
        </div>
      )}
      {error && (
        <div className={styles.boxItem}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Switch
