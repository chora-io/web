'use client'

import { Result } from 'chora/components'
import { InputString } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryBalancesByBatch.module.css'

const queryBalancesByBatch = '/regen/ecocredit/v1/balances-by-batch'

const QueryBalancesByBatch = () => {
  const { chainInfo } = useContext(WalletContext)

  // form inputs
  const [denom, setDenom] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(chainInfo.rest + queryBalancesByBatch + '/' + denom)
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
    <div id="query-balances-by-batch" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryBalancesByBatch'}</h2>
        <p>{'query all balances by credit batch denom'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputString
          id="query-balances-by-batch-denom"
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

export default QueryBalancesByBatch
