'use client'

import { Result } from 'chora/components'
import { InputNumber } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryTallyResult.module.css'

const queryTallyResult = '/cosmos/group/v1/proposals' // + "/tally"

const QueryTallyResult = () => {
  const { chainInfo } = useContext(WalletContext)

  // form inputs
  const [id, setId] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(chainInfo.rest + queryTallyResult + '/' + id + '/tally')
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
    <div id="query-tally-result" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryTallyResult'}</h2>
        <p>{'query tally result by the id of the proposal'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputNumber
          id="query-tally-result-proposal-id"
          label="proposal id"
          number={id}
          setNumber={setId}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryTallyResult
