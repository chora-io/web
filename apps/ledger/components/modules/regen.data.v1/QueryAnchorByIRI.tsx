'use client'

import { Result } from 'chora/components'
import { InputIRI } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryAnchorByIRI.module.css'

const queryAnchorByIRI = '/regen/data/v1/anchor-by-iri'

const QueryAnchorByIRI = () => {
  const { chainInfo, network } = useContext(WalletContext)

  const [iri, setIri] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(chainInfo.rest + queryAnchorByIRI + '/' + iri)
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
    <div id="query-anchor-by-iri" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryAnchorByIRI'}</h2>
        <p>{'query a data anchor by the iri of the data'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputIRI
          id="query-anchor-by-iri-iri"
          network={network}
          iri={iri}
          setIri={setIri}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryAnchorByIRI
