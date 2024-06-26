'use client'

import { Result } from 'chora/components'
import { InputNumber } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryProposal.module.css'

const queryProposal = '/cosmos/group/v1/proposal'

const QueryProposal = () => {
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

    fetch(chainInfo.rest + queryProposal + '/' + id)
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
    <div id="query-proposal" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryProposal'}</h2>
        <p>{'query a group proposal by the id of the proposal'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputNumber
          id="query-proposal-id"
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

export default QueryProposal
