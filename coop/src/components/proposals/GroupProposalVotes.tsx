import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/utils/chains"

import * as styles from "./GroupProposalVotes.module.css"

const queryVotes = "cosmos/group/v1/votes_by_proposal"

const GroupProposalVotes = ({ proposalId }) => {

  const { chainInfo } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string>("")
  const [votes, setVotes] = useState<any>(null)

  useEffect(() => {
    setVotes(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch votes if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {

      // async function workaround
      const fetchVotes = async () => {

        // fetch votes from selected network
        await fetch(chainInfo.rest + "/" + queryVotes + "/" + proposalId)
          .then(res => res.json())
          .then(res => {
            if (res.code) {
              setError(res.message)
            } else {
              setVotes(res["votes"])
            }
          })
      }

      // call async function
      fetchVotes().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  return (
    <div className={styles.container}>
      {!votes && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {votes && !error && votes.map(vote => (
        <div className={styles.votes}>
          <div className={styles.item}>
            <h3>
              {"voter"}
            </h3>
            <p>
              {vote["voter"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"option"}
            </h3>
            <p>
              {vote["option"]}
            </p>
          </div>
          <Link to={`/proposals/?id=${proposalId}&voter=${vote["voter"]}`}>
            {"view vote"}
          </Link>
        </div>
      ))}
      {votes && !error && votes.length === 0 && (
        <div>
          {"no votes found"}
        </div>
      )}
      {error && (
        <div>
          {error}
        </div>
      )}
    </div>
  )
}

export default GroupProposalVotes
