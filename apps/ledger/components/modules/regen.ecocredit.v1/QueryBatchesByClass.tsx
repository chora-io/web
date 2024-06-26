'use client'

import { Result } from 'chora/components'
import { InputString } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryBatchesByClass.module.css'

const queryBatchesByClass = '/regen/ecocredit/v1/batches-by-class'

const QueryBatchesByClass = () => {
  const { chainInfo } = useContext(WalletContext)

  // form inputs
  const [classId, setDenom] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(chainInfo.rest + queryBatchesByClass + '/' + classId)
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
    <div id="query-batches-by-class" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryBatchesByClass'}</h2>
        <p>{'query all credit batches by class id'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputString
          id="query-balance-batch-class-id"
          label="class id"
          placeholder="C01"
          string={classId}
          setString={setDenom}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryBatchesByClass
