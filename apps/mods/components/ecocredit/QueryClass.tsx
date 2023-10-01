'use client'

import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { InputString, Result } from 'chora/components'

import styles from './QueryClass.module.css'

const queryClass = '/regen/ecocredit/v1/class'

const QueryClass = () => {
  const { chainInfo } = useContext(WalletContext)

  // form input
  const [id, setId] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    fetch(chainInfo.rest + queryClass + '/' + id)
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
    <div id="query-class" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryClass'}</h2>
        <p>{'query a credit class by id'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputString
          id="query-class-id"
          label="class id"
          placeholder="C01"
          string={id}
          setString={setId}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryClass
