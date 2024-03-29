'use client'

import { InputIRI, Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './GetData.module.css'

const GetData = () => {
  const { network } = useContext(WalletContext)

  // data input
  const [iri, setIri] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  // TODO: add hook for server url

  // whether network is a local network
  const localChain = network?.includes('-local')

  // chora server (use local server if local network)
  let serverUrl = 'http://localhost:3000'
  if (!localChain) {
    serverUrl = 'https://server.chora.io'
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(serverUrl + '/data/' + iri)
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
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'get data'}</h2>
        <p>{'get data by iri from chora server'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputIRI
          network={'chora'} // always for chora server
          iri={iri}
          setIri={setIri}
        />
        <button type="submit">{'get data'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default GetData
