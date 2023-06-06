
import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { InputNumber, Result } from "chora/components"

import * as styles from "./QueryVotesByProposal.module.css"

const queryVotesByProposal = "/cosmos/group/v1/votes_by_proposal"

const QueryVotesByProposal = () => {

  const { chainInfo, network } = useContext(WalletContext)

  // form input
  const [proposalId, setProposalId] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryVotesByProposal + "/" + proposalId)
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setError(data.message)
        } else {
          setSuccess(JSON.stringify(data, null, "  "))
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  return (
    <div id="query-votes-by-proposal" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryVotesByProposal"}
        </h2>
        <p>
          {"query votes by the id of a proposal"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputNumber
          id="query-votes-by-proposal-proposal-id"
          label="proposal id"
          number={proposalId}
          setNumber={setProposalId}
        />
        <button type="submit">
          {"search"}
        </button>
      </form>
      <Result
        error={error}
        success={success}
      />
    </div>
  )
}

export default QueryVotesByProposal
