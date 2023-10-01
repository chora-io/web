'use client'

import { WalletContext } from 'chora'
import { InputAddress, Result } from 'chora/components'
import { useContext, useState } from 'react'

import styles from './QueryVotesByVoter.module.css'

const queryVotesByVoter = '/cosmos/group/v1/votes_by_voter'

const QueryVotesByVoter = () => {
  const { chainInfo, network } = useContext(WalletContext)

  // form input
  const [voter, setVoter] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    fetch(chainInfo.rest + queryVotesByVoter + '/' + voter)
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
    <div id="query-votes-by-voter" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'QueryVotesByVoter'}</h2>
        <p>{'query votes by the address of a voter'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-votes-by-voter-voter"
          label="voter"
          network={network}
          address={voter}
          setAddress={setVoter}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} success={success} />
    </div>
  )
}

export default QueryVotesByVoter
