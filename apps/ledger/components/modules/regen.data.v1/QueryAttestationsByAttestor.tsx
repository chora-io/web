'use client'

import { Result } from 'chora/components'
import { InputAddress } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryAttestationsByAttestor.module.css'

const queryAttestationsByAttestor = '/regen/data/v1/attestations-by-attestor'

const QueryAttestationsByAttestor = () => {
  const { chainInfo, network } = useContext(WalletContext)

  const [attestor, setAttestor] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

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
          id="query-attestations-by-attestor-address"
          label="attestor"
          network={network}
          address={attestor}
          setAddress={setAttestor}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryAttestationsByAttestor
