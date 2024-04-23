'use client'

import { Result } from 'chora/components'
import { InputAddress } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryGroupPoliciesByAdmin.module.css'

const queryGroupPoliciesByAdmin = '/cosmos/group/v1/group_policies_by_admin'

const QueryGroupPoliciesByAdmin = () => {
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

    fetch(chainInfo.rest + queryGroupPoliciesByAdmin + '/' + admin)
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
    <div id="query-group-policies-by-admin" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryGroupPoliciesByAdmin'}</h2>
        <p>{'query group policies by the address of the admin'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-group-policies-by-admin-admin"
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

export default QueryGroupPoliciesByAdmin
