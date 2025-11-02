'use client'

import { Result } from 'chora/components'
import { InputString } from 'chora/components/forms'
import { useState } from 'react'

import styles from './SubmitIntent.module.css'

const SubmitIntent = () => {
  // input and options
  const [input, setInput] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = (event: any) => {
    event.preventDefault()

    fetch('http://localhost:4000/intents', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ intent: input }),
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
        <h2>{'submit intent'}</h2>
        <p>{'submit intent to the intent pool'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputString
          id="intent"
          label="intent"
          placeholder="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
          string={input}
          initString={
            'BcDBAIg21PQVEIpNQ4aM4wDkqw6z4fYP7WK+SFa1lkR/z5v29wgjydb+6psttDpLMHqappUFQDQno6+AUGwaMmQcByBfdZgNt39oF/NFsqq1JPp73rS/RxhJtvZX32yh1VmC0VOrYVgHhGJT08qqYVg3cyiiTQCGFID/FuPxlBs2TyS5cgFnbXQgSHKk/RMz4TV9i8zKyzu8rCsyNTUV'
          }
          setString={setInput}
        />
        <button type="submit">{'submit'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default SubmitIntent
