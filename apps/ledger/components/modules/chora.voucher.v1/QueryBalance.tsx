'use client'

import { Result } from 'chora/components'
import { InputAddress, InputNumber } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryBalance.module.css'

const queryBalance = '/chora/voucher/v1/balance'

const QueryBalance = () => {
  const { chainInfo } = useContext(WalletContext)

  // form inputs
  const [id, setId] = useState<string>('')
  const [address, setAddress] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(chainInfo.rest + queryBalance + '/' + id + '/' + address)
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
        <p>
          {
            'query a balance by the id of the voucher and the address of the owner'
          }
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputNumber
          id="query-balance-id"
          label="voucher id"
          number={id}
          setNumber={setId}
        />
        <InputAddress
          id="query-balance-address"
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

export default QueryBalance
