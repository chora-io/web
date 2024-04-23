'use client'

import { Result } from 'chora/components'
import { InputNumber } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryAllBalances.module.css'

const queryBalance = '/cosmos/bank/v1beta1/balance'

const QueryAllBalances = () => {
  const { chainInfo } = useContext(WalletContext)

  const [id, setId] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(chainInfo.rest + queryBalance + '/' + id)
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
        <p>{'query all token balances'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputNumber
          id="query-all-balances-id"
          label="balance id"
          number={id}
          setNumber={setId}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryAllBalances
