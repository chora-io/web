import * as React from "react"

const defaultId = "hash"
const defaultLabel = "hash"

const defaultPlaceholder = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="

const InputHash = ({ id, label, placeholder, hash, setHash }: any) => (
  <label htmlFor={id ? id : defaultId}>
    {label ? label : defaultLabel}
    <input
      id={id ? id : defaultId}
      value={hash}
      placeholder={placeholder ? placeholder : defaultPlaceholder}
      onChange={event => setHash(event.target.value)}
    />
  </label>
)

export default InputHash
