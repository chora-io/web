'use client'

import { Result } from 'chora/components'
import { InputString } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryProjectsByClass.module.css'

const queryProjectsByClass = '/regen/ecocredit/v1/projects-by-class'

const QueryProjectsByClass = () => {
  const { chainInfo } = useContext(WalletContext)

  // form inputs
  const [classId, setClassId] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(chainInfo.rest + queryProjectsByClass + '/' + classId)
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
    <div id="query-projects-by-class" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryProjectsByClass'}</h2>
        <p>{'query all projects by class id'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputString
          id="query-projects-by-class-class-id"
          label="class id"
          placeholder="C01"
          string={classId}
          setString={setClassId}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryProjectsByClass
