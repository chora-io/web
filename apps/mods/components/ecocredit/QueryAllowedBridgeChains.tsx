'use client'

import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { Result } from 'chora/components'

import styles from './QueryAllowedBridgeChains.module.css'

const queryAllowedBridgeChains = '/regen/ecocredit/v1/allowed-bridge-chains'

const QueryAllowedBridgeChains = () => {
  const { chainInfo } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    fetch(chainInfo.rest + queryAllowedBridgeChains)
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
    <div id="query-allowed-bridge-chains" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryAllowedBridgeChains'}</h2>
        <p>{'query allowed bridge chains'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryAllowedBridgeChains
