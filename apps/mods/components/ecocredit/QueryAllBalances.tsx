'use client'

import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { Result } from 'chora/components'

import styles from './QueryAllBalances.module.css'

const queryAllBalances = '/regen/ecocredit/v1/all-balances'

const QueryAllBalances = () => {
  const { chainInfo } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(chainInfo.rest + queryAllBalances)
      .then((res) => res.json())
      .then((data) => {
        if (data.code) {
          setError(data.message)
        } else {
          setSuccess(JSON.stringify(data, null, '  '))
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <div id="query-all-balances" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryAllBalances'}</h2>
        <p>{'query all credit batch balances'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryAllBalances
