'use client'

import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { InputString, Result } from 'chora/components'

import styles from './QueryProjectsByReferenceId.module.css'

const queryProjectsByReferenceId =
  '/regen/ecocredit/v1/projects-by-reference-id'

const QueryProjectsByReferenceId = () => {
  const { chainInfo, network } = useContext(WalletContext)

  // form input
  const [referenceId, setClassId] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    fetch(chainInfo.rest + queryProjectsByReferenceId + '/' + referenceId)
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
    <div id="query-projects-by-reference-id" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryProjectsByReferenceId'}</h2>
        <p>{'query all projects by reference id'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputString
          id="query-projects-by-reference-id-reference-id"
          label="reference id"
          placeholder="VCS-001"
          string={referenceId}
          setString={setClassId}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryProjectsByReferenceId
