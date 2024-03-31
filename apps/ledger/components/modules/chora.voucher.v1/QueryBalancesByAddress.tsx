'use client'

import { InputAddress, Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryBalancesByAddress.module.css'

const queryBalancesByAddress = '/chora/voucher/v1/balances-by-address'

const QueryBalancesByAddress = () => {
  const { chainInfo } = useContext(WalletContext)

  // form inputs
  const [address, setAddress] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(chainInfo.rest + queryBalancesByAddress + '/' + address)
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
    <div id="query-balances-by-address" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryBalancesByAddress'}</h2>
        <p>{'query all balances by the address of the owner'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-balances-by-address-address"
          label="address"
          number={address}
          setNumber={setAddress}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryBalancesByAddress
