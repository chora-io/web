import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/utils/chains"

import MemberPreview from "./MemberPreview"

import * as styles from "./Members.module.css"

const groupId = "1" // TODO: configuration file
const queryMembers = "cosmos/group/v1/group_members"

const Members = () => {

  const { chainInfo } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string>("")
  const [members, setMembers] = useState<any>(null)

  useEffect(() => {
    setMembers(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch members if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {

      // async function workaround
      const fetchMembers = async () => {

        // fetch members from selected network
        await fetch(chainInfo.rest + "/" + queryMembers + "/" + groupId)
          .then(res => res.json())
          .then(res => {
            if (res.code) {
              setError(res.message)
            } else {
              setMembers(res["members"])
            }
          })
      }

      // call async function
      fetchMembers().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  return (
    <div className={styles.container}>
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
      {error && (
        <div>
          {error}
        </div>
      )}
    </div>
  )
}

export default Members
