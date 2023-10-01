'use client'

import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { InputString, Result } from 'chora/components'

import styles from './QuerySupply.module.css'

const querySupply = '/regen/ecocredit/v1/supply'

const QuerySupply = () => {
  const { chainInfo } = useContext(WalletContext)

  // form input
  const [denom, setDenom] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    fetch(chainInfo.rest + querySupply + '/' + denom)
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
    <div id="query-supply" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QuerySupply'}</h2>
        <p>{'query supply by batch denom'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputString
          id="query-supply-denom"
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

export default QuerySupply
