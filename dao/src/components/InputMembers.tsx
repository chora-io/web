import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "../context/WalletContext"

const choraMembersPlaceholder = "chora1jx34255cgvxpthkg572ma6rhq6crwl6xh7g0md"
const regenMembersPlaceholder = "regen1jx34255cgvxpthkg572ma6rhq6crwl6x2s4ajx"

const InputMembers = ({ members, setMembers }: any) => {

  // @ts-ignore
  const { chainInfo } = useContext(WalletContext)

  let membersPlaceholder: string
  if (chainInfo?.chainId.includes("chora")) {
    membersPlaceholder = choraMembersPlaceholder
  } else {
    membersPlaceholder = regenMembersPlaceholder
  }

  return (
    <label htmlFor="members">
      {"members"}
      <input
        id="members"
        value={members}
        placeholder={membersPlaceholder}
        onChange={event => setMembers(event.target.value)}
      />
    </label>
  )
}

export default InputMembers
