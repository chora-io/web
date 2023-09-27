import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { InputNumber, Result } from 'chora/components'

import styles from './QueryGroupPoliciesByGroup.module.css'

const queryGroupPoliciesByGroup = '/cosmos/group/v1/group_policies_by_group'

const QueryGroupPoliciesByGroup = () => {
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

    fetch(chainInfo.rest + queryGroupPoliciesByGroup + '/' + id)
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
    <div id="query-group-policies-by-group" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryGroupPoliciesByGroup'}</h2>
        <p>{'query group policies by the id of the group'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputNumber
          id="query-group-policies-by-group-group-id"
          label="group id"
          number={id}
          setNumber={setId}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryGroupPoliciesByGroup
