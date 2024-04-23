'use client'

import { Result } from 'chora/components'
import { InputAddress } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryClassesByAdmin.module.css'

const queryClassesByAdmin = '/regen/ecocredit/v1/classes-by-admin'

const QueryClassesByAdmin = () => {
  const { chainInfo, network } = useContext(WalletContext)

  // form inputs
  const [admin, setAdmin] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(chainInfo.rest + queryClassesByAdmin + '/' + admin)
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
    <div id="query-classes-by-admin" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryClassesByAdmin'}</h2>
        <p>{'query all credit classes by the address of the admin'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-classes-by-admin"
          label="admin"
          network={network}
          address={admin}
          setAddress={setAdmin}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryClassesByAdmin
