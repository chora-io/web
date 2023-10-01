'use client'

import { InputString, Result } from 'chora/components'
import { useState } from 'react'

import styles from './Generate.module.css'

const Generate = () => {
  const [error, setError] = useState<string | null>(null)
  const [input, setInput] = useState<string>('')
  const [result, setResult] = useState<any>(null)

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      })

      const data = await response.json()
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }

      setInput('')
      setResult(data.result)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'generate quote'}</h2>
        <p>{'generate a quote that uses a word'}</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <InputString
          id="word"
          label=""
          placeholder="enter a word..."
          string={input}
          setString={setInput}
        />
        <button type="submit">{'submit'}</button>
      </form>
      <div className={styles.boxResultBelow}>
        <Result error={error} success={result} />
      </div>
    </div>
  )
}

export default Generate
