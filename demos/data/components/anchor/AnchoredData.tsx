'use client'

import { InputIRI, InputURL, Result } from 'chora/components'
import { InputContentHashJSON } from 'chora/components/regen.data.v1'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './AnchoredData.module.css'

const queryResolversByHash = '/regen/data/v1/resolvers-by-hash'
const queryResolversByIRI = '/regen/data/v1/resolvers-by-iri'

const AnchoredData = () => {
  const { chainInfo, network } = useContext(WalletContext)

  // input and options
  const [input, setInput] = useState<string>('')
  const [option, setOption] = useState<string>('iri')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = (event: any) => {
    event.preventDefault()

    let query: string | undefined

    switch (option) {
      case 'hash':
        query = queryResolversByHash
        break
      case 'iri':
        query = queryResolversByIRI
        break
    }

    fetch(chainInfo.rest + '/' + query + '/' + input)
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
        <h2>{'anchored data'}</h2>
        <p>{`look up anchored data on ${network}`}</p>
      </div>
      <div className={styles.boxOptions}>
        <button
          className={option === 'iri' ? styles.boxOptionActive : undefined}
          onClick={() => setOption('iri')}
        >
          {'iri'}
        </button>
        <button
          className={option === 'hash' ? styles.boxOptionActive : undefined}
          onClick={() => setOption('hash')}
        >
          {'hash'}
        </button>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        {option === 'iri' && (
          <InputIRI
            id="resolvers-by-iri"
            label=""
            placeholder=""
            network={network}
            string={input}
            setIri={setInput}
          />
        )}
        {option === 'hash' && (
          <InputContentHashJSON
            id="resolvers-by-hash"
            label=""
            placeholder=""
            network={network}
            contentHash={input}
            setContentHash={setInput}
          />
        )}
        {option === 'url' && (
          <InputURL
            id="resolvers-by-url"
            label=""
            placeholder=""
            network={network}
            contentHash={input}
            setContentHash={setInput}
          />
        )}
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default AnchoredData
