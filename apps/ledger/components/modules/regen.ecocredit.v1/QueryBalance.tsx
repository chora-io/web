'use client'

import { Result } from 'chora/components'
import { InputAddress, InputString } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryBalance.module.css'

const queryBalance = '/regen/ecocredit/v1/balance'

const QueryBalance = () => {
  const { chainInfo, network } = useContext(WalletContext)

  // form inputs
  const [address, setAddress] = useState<string>('')
  const [denom, setDenom] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(chainInfo.rest + queryBalance + '/' + denom + '/' + address)
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
    <div id="query-balance" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryBalance'}</h2>
        <p>{'query balance by credit owner address and batch denom'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-balance-address"
          label="address"
          network={network}
          address={address}
          setAddress={setAddress}
        />
        <InputString
          id="query-balance-batch-denom"
          label="batch denom"
          placeholder="C01-001-20200101-20210101-001"
          string={denom}
          setString={setDenom}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryBalance
