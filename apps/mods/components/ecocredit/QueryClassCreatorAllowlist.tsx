'use client'

import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { Result } from 'chora/components'

import styles from './QueryClassCreatorAllowlist.module.css'

const queryClassCreatorAllowlist = '/regen/ecocredit/v1/class-creator-allowlist'

const QueryClassCreatorAllowlist = () => {
  const { chainInfo } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    fetch(chainInfo.rest + queryClassCreatorAllowlist)
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
    <div id="query-class-creator-allowlist" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryClassCreatorAllowlist'}</h2>
        <p>{'query whether the class creator allowlist is enabled'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryClassCreatorAllowlist
