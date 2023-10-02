'use client'

import { InputString, Result } from 'chora/components'
import { useState } from 'react'

import styles from './Completion.module.css'

const Completion = () => {
  const [error, setError] = useState<string | null>(null)
  const [prompt, setPrompt] = useState<string>('')
  const [result, setResult] = useState<any>(null)

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }

      setPrompt('')
      setResult(data.result)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'text completion'}</h2>
        <p>{'return a text completion that matches the instructions or context'}</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <InputString
          id="prompt"
          label=""
          placeholder="enter a prompt..."
          string={prompt}
          setString={setPrompt}
        />
        <button type="submit">{'submit'}</button>
      </form>
      <div className={styles.boxResultBelow}>
        <Result error={error} success={result} />
      </div>
    </div>
  )
}

export default Completion
