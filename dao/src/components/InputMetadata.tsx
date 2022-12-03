import * as React from "react"

const placeholder = "regen:13toVfvC2YxrrfSXWB5h2BGHiXZURsKxWUz72uDRDSPMCrYPguGUXSC.rdf"

const InputMetadata = ({ metadata, setMetadata }: any) => (
  <label htmlFor="metadata">
    {"metadata"}
    <input
      id="metadata"
      value={metadata}
      placeholder={placeholder}
      onChange={event => setMetadata(event.target.value)}
    />
  </label>
)

export default InputMetadata
