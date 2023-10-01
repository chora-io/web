'use client'

import { WalletContext } from 'chora'
import { Result } from 'chora/components'
import { useContext, useState } from 'react'

import styles from './QueryNodes.module.css'

const queryNodes = '/chora/geonode/v1/nodes'

const QueryNodes = () => {
  const { chainInfo } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    fetch(chainInfo.rest + queryNodes)
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
    <div id="query-nodes" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryNodes'}</h2>
        <p>{'query all nodes'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryNodes
