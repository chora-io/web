import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraLocal, choraTestnet } from "chora/chains"

import MemberPreview from "./MemberPreview"

import * as styles from "./Members.module.css"

const groupId = "1"
const queryMembers = "cosmos/group/v1/group_members"

const Members = () => {

  const { chainInfo, network } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [members, setMembers] = useState<any>(null)

  // list options
  const [sort, setSort] = useState<string>("ascending")

  // whether network is supported by coop app
  const coopChain = (
    network === choraTestnet.chainId ||
    network === choraLocal.chainId
  )

  // fetch on load and value change
  useEffect(() => {
    setMembers(null)
    setError("")

    // error if network is not chora-testnet-1 (or chora-local)
    if (!coopChain) {
      setError("switch to chora-testnet-1")
    }

    // fetch members if network is chora-testnet-1 (or chora-local)
    if (coopChain) {
      fetchMembers().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo, network])

  // sort on load and value change
  useEffect(() => {
    const ms = members ? [...members] : []

    if (members && sort === "ascending") {
      ms.sort((a, b) => new Date(b["member"]["added_at"]) - new Date(a["member"]["added_at"]))
    }

    if (members && sort === "descending") {
      ms.sort((a, b) => new Date(a["member"]["added_at"]) - new Date(b["member"]["added_at"]))
    }

    setMembers(ms)
  }, [sort])

  // fetch members asynchronously
  const fetchMembers = async () => {

    // fetch members from selected network
    await fetch(chainInfo.rest + "/" + queryMembers + "/" + groupId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          const ms = res["members"]

         // sort ascending by default
          ms.sort((a, b) => new Date(b["member"]["added_at"]) - new Date(a["member"]["added_at"]))
          setSort("ascending")

          setMembers(ms)
        }
      })
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxOptions}>
        {sort === "descending" && (
          <button onClick={() => setSort("ascending")}>
            {"sort by newest"}
          </button>
        )}
        {sort === "ascending" && (
          <button onClick={() => setSort("descending")}>
            {"sort by oldest"}
          </button>
        )}
      </div>
      {!members && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {members && members.map(member => (
        <MemberPreview
          key={member["member"]["address"]}
          member={member["member"]}
        />
      ))}
      {members && members.length === 0 && !error && (
        <div>
          {"no members found"}
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

export default Members
