'use client'

import { InputAddress, Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryVouchersByIssuer.module.css'

const queryVouchersByIssuer = '/chora/voucher/v1/vouchers-by-issuer'

const QueryVouchersByIssuer = () => {
  const { chainInfo, network } = useContext(WalletContext)

  // form input
  const [issuer, setIssuer] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(chainInfo.rest + queryVouchersByIssuer + '/' + issuer)
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
    <div id="query-vouchers-by-issuer" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryVouchersByIssuer'}</h2>
        <p>{'query vouchers by the address of the issuer'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-vouchers-by-issuer-issuer"
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

export default QueryVouchersByIssuer
