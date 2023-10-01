'use client'

import { WalletContext } from 'chora'
import { InputNumber, Result } from 'chora/components'
import { useContext, useState } from 'react'

import styles from './QueryBalance.module.css'

const queryBalance = '/cosmos/bank/v1beta1/balance'

const QueryBalance = () => {
  const { chainInfo } = useContext(WalletContext)

  const [id, setId] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

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
    <div id="query-balance" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryBalance'}</h2>
        <p>{'query token balance'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputNumber
          id="query-balance-id"
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

export default QueryBalance
