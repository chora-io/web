import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "chora"

const choraPlaceholder = "chora1jx34255cgvxpthkg572ma6rhq6crwl6xh7g0md"
const regenPlaceholder = "regen1jx34255cgvxpthkg572ma6rhq6crwl6x2s4ajx"
const choraLongPlaceholder = "chora1afk9zr2hn2jsac63h4hm60vl9z3e5u69gndzf7c99cqge3vzwjzsdnjkmu"
const regenLongPlaceholder = "regen1afk9zr2hn2jsac63h4hm60vl9z3e5u69gndzf7c99cqge3vzwjzsdnjkmu"

const InputAddress = ({ id, label, long, address, setAddress }: any) => {

  const { network } = useContext(WalletContext)

  let placeholder: string
  if (network === undefined || network.includes("chora")) {
    if (long) {
      placeholder = choraLongPlaceholder
    } else {
      placeholder = choraPlaceholder
    }
  } else {
    if (long) {
      placeholder = regenLongPlaceholder
    } else {
      placeholder = regenPlaceholder
    }
  }

  return (
    <label htmlFor={id ? id : "address"}>
      {label ? label : "address"}
      <input
        id={id ? id : "address"}
        value={address}
        placeholder={placeholder}
        onChange={event => setAddress(event.target.value)}
      />
    </label>
  )
}

export default InputAddress
