import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { InputAddress, SelectMessage, Result } from 'chora/components'

import styles from './QueryGrants.module.css'

const queryGrants = '/cosmos/authz/v1beta1/grants'

const QueryGrants = () => {
  const { chainInfo, network } = useContext(WalletContext)

  const [granter, setGranter] = useState('')
  const [grantee, setGrantee] = useState('')
  const [msgTypeUrl, setMsgTypeUrl] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    const params = `?grantee=${grantee}&granter=${granter}&msg_type_url=${msgTypeUrl}`

    fetch(chainInfo.rest + queryGrants + params)
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
    <div id="query-grants" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryGrants'}</h2>
        <p>{'query granted authorizations'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-grants-granter"
          label="granter"
          network={network}
          address={granter}
          setAddress={setGranter}
        />
        <InputAddress
          id="query-grants-grantee"
          label="grantee"
          network={network}
          address={grantee}
          setAddress={setGrantee}
        />
        <SelectMessage
          id="query-grants-msg-type-url"
          label="msg type url"
          typeOnly={true}
          message={msgTypeUrl}
          setMessage={setMsgTypeUrl}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryGrants
