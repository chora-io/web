'use client'

import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { Result } from 'chora/components'

import styles from './QueryClassFee.module.css'

const queryClassFee = '/regen/ecocredit/v1/class-fee'

const QueryClassFee = () => {
  const { chainInfo } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(chainInfo.rest + queryClassFee)
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
    <div id="query-class-fee" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryClassFee'}</h2>
        <p>{'query the credit class creation fee'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryClassFee
