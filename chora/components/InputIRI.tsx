import * as React from "react"

const defaultId = "iri"
const defaultLabel = "iri"

const choraPlaceholder = "chora:13toVfvC2YxrrfSXWB5h2BGHiXZURsKxWUz72uDRDSPMCrYPguGUXSC.rdf"
const regenPlaceholder = "regen:13toVfvC2YxrrfSXWB5h2BGHiXZURsKxWUz72uDRDSPMCrYPguGUXSC.rdf"

const InputIRI = ({ id, label, placeholder, network, iri, setIri }: any) => {

  let defaultPlaceholder: string
  if (network === undefined || network.includes("chora")) {
    defaultPlaceholder = choraPlaceholder
  } else {
    defaultPlaceholder = regenPlaceholder
  }

  return (
    <label htmlFor={id ? id : defaultId}>
      {label ? label : defaultLabel}
      <input
        id={id ? id : defaultId}
        value={iri}
        placeholder={placeholder || defaultPlaceholder}
        onChange={event => setIri(event.target.value)}
      />
    </label>
  )
}

export default InputIRI
