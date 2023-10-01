'use client'

import { WalletContext } from 'chora'
import { InputIRI, Result } from 'chora/components'
import { useContext, useState } from 'react'

import styles from './ConvertIRIToHash.module.css'

const convertIriToHash = '/regen/data/v1/convert-iri-to-hash'

const ConvertIRIToHash = () => {
  const { chainInfo, network } = useContext(WalletContext)

  const [iri, setIri] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    fetch(chainInfo.rest + convertIriToHash + '/' + iri)
      .then((res) => res.json())
      .then((data) => {
        if (data.code) {
          setError(data.message)
        } else {
          setSuccess(JSON.stringify(data['content_hash'], null, '  '))
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <div id="convert-iri-to-hash" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'ConvertIRIToHash'}</h2>
        <p>{'convert an iri to a content hash'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputIRI
          id="convert-iri-to-hash-iri"
          network={network}
          iri={iri}
          setIri={setIri}
        />
        <button type="submit">{'convert'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default ConvertIRIToHash
