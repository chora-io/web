import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { Result } from 'chora/components'
import { InputContentHash, InputContentHashJSON } from 'chora/components/data'

import SelectInput from '../SelectInput'

import styles from './ConvertHashToIRI.module.css'

const convertHashToIri = '/regen/data/v1/convert-hash-to-iri'

const ConvertHashToIRI = () => {
  const { chainInfo } = useContext(WalletContext)

  const [input, setInput] = useState('form')
  const [contentHash, setContentHash] = useState<any>(undefined)
  const [contentHashJson, setContentHashJson] = useState<string>('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

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

    fetch(chainInfo.rest + convertHashToIri, {
      method: 'POST',
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code) {
          setError(data.message)
        } else {
          setSuccess(data.iri)
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  const handleSetInput = (input: string) => {
    setInput(input)
    setError(undefined)
    setSuccess(undefined)
  }

  return (
    <div id="convert-hash-to-iri" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'ConvertHashToIRI'}</h2>
        <p>{'convert a content hash to an iri'}</p>
      </div>
      <SelectInput input={input} setInput={handleSetInput} />
      {input == 'form' ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputContentHash
            id="convert-hash-to-iri-content-hash"
            contentHash={contentHash}
            setContentHash={setContentHash}
          />
          <button type="submit">{'convert'}</button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputContentHashJSON
            id="convert-hash-to-iri-content-hash"
            json={contentHashJson}
            setJson={setContentHashJson}
          />
          <button type="submit">{'convert'}</button>
        </form>
      )}
      <Result error={error} success={success} />
    </div>
  )
}

export default ConvertHashToIRI
