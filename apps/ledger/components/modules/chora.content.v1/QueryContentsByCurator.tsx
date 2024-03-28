'use client'

import { InputAddress, Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryContentsByCurator.module.css'

const queryContentsByCurator = '/chora/content/v1/contents-by-curator'

const QueryContentsByCurator = () => {
  const { chainInfo, network } = useContext(WalletContext)

  // form input
  const [curator, setCurator] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(chainInfo.rest + queryContentsByCurator + '/' + curator)
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
    <div id="query-contents-by-curator" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryContentsByCurator'}</h2>
        <p>{'query contents by the address of the curator'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-contents-by-curator-curator"
          label="curator"
          network={network}
          address={curator}
          setAddress={setCurator}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryContentsByCurator
