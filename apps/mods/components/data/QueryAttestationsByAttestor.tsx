'use client'

import { WalletContext } from 'chora'
import { InputAddress, Result } from 'chora/components'
import { useContext, useState } from 'react'

import styles from './QueryAttestationsByAttestor.module.css'

const queryAttestationsByAttestor = '/regen/data/v1/attestations-by-attestor'

const QueryAttestationsByAttestor = () => {
  const { chainInfo, network } = useContext(WalletContext)

  const [attestor, setAttestor] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    fetch(chainInfo.rest + queryAttestationsByAttestor + '/' + attestor)
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
    <div id="query-attestations-by-attestor" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryAttestationsByAttestor'}</h2>
        <p>{'query data attestations by an attestor address'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-attestations-by-address-address"
          label="attestor"
          address={attestor}
          setAddress={setAttestor}
          network={network}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryAttestationsByAttestor
