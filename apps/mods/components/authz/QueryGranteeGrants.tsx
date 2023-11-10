'use client'

import { InputAddress, Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryGranteeGrants.module.css'

const queryGranteeGrants = '/cosmos/authz/v1beta1/grants/grantee'

const QueryGranteeGrants = () => {
  const { chainInfo, network } = useContext(WalletContext)

  const [grantee, setGrantee] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(chainInfo.rest + queryGranteeGrants + '/' + grantee)
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
    <div id="query-grantee-grants" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryGranteeGrants'}</h2>
        <p>{'query granted authorizations'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-grants-grantee"
          label="grantee"
          network={network}
          address={grantee}
          setAddress={setGrantee}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryGranteeGrants
