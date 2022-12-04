import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "../context/WalletContext"

import * as styles from "./InputMembers.module.css"

const choraAddressPlaceholder = "chora1jx34255cgvxpthkg572ma6rhq6crwl6xh7g0md"
const regenAddressPlaceholder = "regen1jx34255cgvxpthkg572ma6rhq6crwl6x2s4ajx"

const weightPlaceholder = "1"
const metadataPlaceholder = "regen:13toVfvC2YxrrfSXWB5h2BGHiXZURsKxWUz72uDRDSPMCrYPguGUXSC.rdf"

const InputMembers = ({ members, setMembers }: any) => {

  // @ts-ignore
  const { network } = useContext(WalletContext)

  let addressPlaceholder: string
  if (network.includes("chora")) {
    addressPlaceholder = choraAddressPlaceholder
  } else {
    addressPlaceholder = regenAddressPlaceholder
  }

  const handleChange = (i, id, event) => {
    let m = members[i]
    m[id] = event.target.value

    let ms = [...members]
    ms[i] = m

    setMembers(ms)
  }

  const handleAddMember = (event) => {
    event?.preventDefault()

    let ms = [...members]
    ms.push({address: "", weight: "", metadata: ""})

    setMembers(ms)
  }

  const handleRemoveMember = (event) => {
    event?.preventDefault()

    if (members.length > 0) {
      let ms = [...members]
      ms.pop()

      setMembers(ms)
    }
  }

  return (
    <label htmlFor="members">
      {"members"}
      {members.length > 0 && members.map((m, i) => (
        <span key={i}>
          <input
            id="address"
            value={m.address}
            placeholder={addressPlaceholder}
            onChange={event => handleChange(i, "address", event)}
          />
          <input
            id="weight"
            value={m.weight}
            placeholder={weightPlaceholder}
            onChange={event => handleChange(i, "weight", event)}
          />
          <input
            id="metadata"
            value={m.metadata}
            placeholder={metadataPlaceholder}
            onChange={event => handleChange(i, "metadata", event)}
          />
        </span>
      ))}
      <span className={styles.options}>
        <button onClick={handleAddMember}>
          {"add member"}
        </button>
        {members.length > 0 && (
          <button onClick={handleRemoveMember}>
            {"remove member"}
          </button>
        )}
      </span>
    </label>
  )
}

export default InputMembers
