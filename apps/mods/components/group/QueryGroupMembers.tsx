import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { InputNumber, Result } from 'chora/components'

import styles from './QueryGroupMembers.module.css'

const queryGroupMembers = '/cosmos/group/v1/group_members'

const QueryGroupMembers = () => {
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

    fetch(chainInfo.rest + queryGroupMembers + '/' + id)
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
    <div id="query-group-members" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryGroupMembers'}</h2>
        <p>{'query members of a group by the id of the group'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputNumber
          id="query-group-members-id"
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

export default QueryGroupMembers
