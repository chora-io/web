'use client'

import { WalletContext } from 'chora'
import { InputAddress, InputString, Result } from 'chora/components'
import { useContext, useState } from 'react'

import styles from './QueryInterchainAccount.module.css'

const queryInterchainAccount = '/regen/intertx/v1/interchain-account'

const QueryInterchainAccount = () => {
  const { chainInfo, network } = useContext(WalletContext)

  // form input
  const [owner, setOwner] = useState<string>('')
  const [connectionId, setConnectionId] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    fetch(
      chainInfo.rest +
        queryInterchainAccount +
        '/' +
        owner +
        '/' +
        connectionId,
    )
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
    <div id="query-interchain-account" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryInterchainAccount'}</h2>
        <p>
          {
            'query an interchain account by address of the owner and the connection id'
          }
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-interchain-account-owner"
          label="owner"
          network={network}
          address={owner}
          setAddress={setOwner}
        />
        <InputString
          id="query-interchain-account-connection-id"
          label="connection id"
          placeholder="connection-0"
          number={connectionId}
          setNumber={setConnectionId}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryInterchainAccount
