'use client'

import { Result } from 'chora/components'
import { InputAddress } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryGranterGrants.module.css'

const queryGranterGrants = '/cosmos/authz/v1beta1/grants/granter'

const QueryGranterGrants = () => {
  const { chainInfo, network } = useContext(WalletContext)

  const [granter, setGranter] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(chainInfo.rest + queryGranterGrants + '/' + granter)
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
    <div id="query-granter-grants" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryGranterGrants'}</h2>
        <p>{'query granted authorizations'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-granter-grants-granter"
          label="granter"
          network={network}
          address={granter}
          setAddress={setGranter}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryGranterGrants
