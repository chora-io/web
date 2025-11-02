'use client'

import { Result } from 'chora/components'
import { useState } from 'react'

import styles from './ListIntents.module.css'

const ListIntents = () => {
  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = (event: any) => {
    event.preventDefault()

    fetch('http://localhost:4000/intents')
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
        <h2>{'list intents'}</h2>
        <p>{'list intents in the intent pool'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit">{'submit'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default ListIntents
