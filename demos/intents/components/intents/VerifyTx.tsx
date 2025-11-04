'use client'

import { Result } from 'chora/components'
import { InputString } from 'chora/components/forms'
import { useState } from 'react'

import styles from './VerifyTx.module.css'

const VerifyTx = () => {
  // input and options
  const [input, setInput] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = (event: any) => {
    event.preventDefault()

    fetch('http://localhost:4000/transactions/verify', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ transaction: input }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code) {
          setError(res.message)
        } else {
          setSuccess(JSON.stringify(res, null, '  '))
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'verify transaction'}</h2>
        <p>{'determine whether a transaction is valid'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputString
          id="transaction"
          label="transaction"
          placeholder="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
          string={input}
          initString={
            'BcDRAIg41PQVEIpNQ4aM44KCAPq9lWc/fPuCjJkVcoMs5Fjd4nZ7YqlBsIYfJ2FNfQmx8oKCmqZVADQcavoKCMWmIUPGcUFBAPnJSEF4dBw2TnpX25kOG0lONyWVjWTz5UoH2U2VwJ0yWlBQzWoY5AGh2NS0sqyGQT6U4ALQowD8txiPp9yweSLJlQs4a6MDQZIj7Z+YCa/pW2RWXt7hZV05NTXLAiCik9FXQCg2DRkyjgsKAuj3Vp798O0LMmZWyA2ykGN1i9vtiaUGwRp+nIQ19SXEygsKqtVwKx0K8LSyariVNnMowU0AhhSA/xbj8ZQbNk8kuXIBZ210IEhypP0TM+E1fYvMyss7vKwrMjU1FQ=='
          }
          setString={setInput}
        />
        <button type="submit">{'submit'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default VerifyTx
