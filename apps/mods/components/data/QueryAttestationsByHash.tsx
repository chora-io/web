'use client'

import { Result } from 'chora/components'
import { InputContentHash, InputContentHashJSON } from 'chora/components/data'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import SelectInput from '../SelectInput'

import styles from './QueryAttestationsByHash.module.css'

const queryAttestationsByHash = '/regen/data/v1/attestations-by-hash'

const QueryAttestationsByHash = () => {
  const { chainInfo } = useContext(WalletContext)

  const [input, setInput] = useState('form')
  const [contentHash, setContentHash] = useState<any>(null)
  const [contentHashJson, setContentHashJson] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    let body: string

    if (input == 'form') {
      body = JSON.stringify({ contentHash: contentHash })
    } else {
      let ch = ''
      try {
        ch = JSON.parse(contentHashJson)
      } catch (err) {
        setError('invalid json')
        return // exit on error
      }
      body = JSON.stringify({ contentHash: ch })
    }

    fetch(chainInfo.rest + queryAttestationsByHash, {
      method: 'POST',
      body: body,
    })
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

  const handleSetInput = (input: string) => {
    setInput(input)
    setError(null)
    setSuccess(null)
  }

  return (
    <div id="query-attestations-by-hash" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryAttestationsByHash'}</h2>
        <p>{'query data attestations by the content hash of the data'}</p>
      </div>
      <SelectInput input={input} setInput={handleSetInput} />
      {input == 'form' ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputContentHash
            id="query-attestations-by-hash-content-hash"
            contentHash={contentHash}
            setContentHash={setContentHash}
          />
          <button type="submit">{'search'}</button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputContentHashJSON
            id="query-attestations-by-hash-content-hash"
            json={contentHashJson}
            setJson={setContentHashJson}
          />
          <button type="submit">{'search'}</button>
        </form>
      )}
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryAttestationsByHash
