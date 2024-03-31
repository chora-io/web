'use client'

import { InputAddress, Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import styles from './QueryProposalsByGroupPolicy.module.css'

const queryProposalsByAdmin = '/cosmos/group/v1/proposals_by_group_policy'

const QueryProposalsByGroupPolicy = () => {
  const { chainInfo, network } = useContext(WalletContext)

  // form inputs
  const [address, setAddress] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    fetch(chainInfo.rest + queryProposalsByAdmin + '/' + address)
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
    <div id="query-proposals-by-group-policy" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryProposalsByGroupPolicy'}</h2>
        <p>{'query proposals by the address of a group policy'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-proposals-by-group-policy-address"
          label="address"
          long={true}
          network={network}
          address={address}
          setAddress={setAddress}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryProposalsByGroupPolicy
