import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { InputAddress, Result } from 'chora/components'

import styles from './QueryBatchesByIssuer.module.css'

const queryBatchesByIssuer = '/regen/ecocredit/v1/batches-by-issuer'

const QueryBatchesByIssuer = () => {
  const { chainInfo, network } = useContext(WalletContext)

  // form input
  const [issuer, setIssuer] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    fetch(chainInfo.rest + queryBatchesByIssuer + '/' + issuer)
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
    <div id="query-batches-by-issuer" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryBatchesByIssuer'}</h2>
        <p>{'query all credit batches by issuer address'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-batches-by-issuer"
          label="issuer"
          network={network}
          address={issuer}
          setAddress={setIssuer}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryBatchesByIssuer
