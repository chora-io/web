import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "../contexts/WalletContext"

const choraPlaceholder = "chora:13toVfvC2YxrrfSXWB5h2BGHiXZURsKxWUz72uDRDSPMCrYPguGUXSC.rdf"
const regenPlaceholder = "regen:13toVfvC2YxrrfSXWB5h2BGHiXZURsKxWUz72uDRDSPMCrYPguGUXSC.rdf"

const InputMetadata = ({ id, label, metadata, setMetadata }: any) => {

  // @ts-ignore
  const { network } = useContext(WalletContext)

  let placeholder: string
  if (network.includes("chora")) {
    placeholder = choraPlaceholder
  } else {
    placeholder = regenPlaceholder
  }

  return (
    <label htmlFor={id ? id : "metadata"}>
      {label ? label : "metadata"}
      <input
        id={id ? id : "metadata"}
        value={metadata}
        placeholder={placeholder}
        onChange={event => setMetadata(event.target.value)}
      />
    </label>
  )
}

export default InputMetadata
