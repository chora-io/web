'use client'

import { InputAddress, Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryNodesByCurator.module.css'

const queryNodesByCurator = '/chora/geonode/v1/nodes-by-curator'

const QueryNodesByCurator = () => {
  const { chainInfo, network } = useContext(WalletContext)

  // form inputs
  const [curator, setCurator] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(chainInfo.rest + queryNodesByCurator + '/' + curator)
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
    <div id="query-nodes-by-curator" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryNodesByCurator'}</h2>
        <p>{'query nodes by the address of the curator'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-nodes-by-curator-curator"
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

export default QueryNodesByCurator
