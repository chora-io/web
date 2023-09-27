import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { InputAddress, Result } from 'chora/components'

import styles from './QueryGranterGrants.module.css'

const queryGranterGrants = '/cosmos/authz/v1beta1/grants/granter'

const QueryGranterGrants = () => {
  const { chainInfo, network } = useContext(WalletContext)

  const [granter, setGranter] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    fetch(chainInfo.rest + queryGranterGrants + '/' + granter)
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
    <div id="query-granter-grants" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryGranterGrants'}</h2>
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
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryGranterGrants
