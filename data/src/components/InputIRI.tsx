import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "../context/WalletContext"

const choraPlaceholder = "chora:13toVfvC2YxrrfSXWB5h2BGHiXZURsKxWUz72uDRDSPMCrYPguGUXSC.rdf"
const regenPlaceholder = "regen:13toVfvC2YxrrfSXWB5h2BGHiXZURsKxWUz72uDRDSPMCrYPguGUXSC.rdf"

const InputIRI = ({ id, label, iri, setIri }: any) => {

  // @ts-ignore
  const { network } = useContext(WalletContext)

  let placeholder: string
  if (network.includes("chora")) {
    placeholder = choraPlaceholder
  } else {
    placeholder = regenPlaceholder
  }

  return (
    <label htmlFor={id ? id : "iri"}>
      {label ? label : "iri"}
      <input
        id={id ? id : "iri"}
        value={iri}
        placeholder={placeholder}
        onChange={event => setIri(event.target.value)}
      />
    </label>
  )
}

export default InputIRI
