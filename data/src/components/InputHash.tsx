import * as React from "react"

const placeholder = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="

const InputHash = ({ id, label, hash, setHash }: any) => (
  <label htmlFor={id ? id : "content-hash"}>
    {label ? label : "content hash"}
    <input
      id={id ? id : "content-hash"}
      value={hash}
      placeholder={placeholder}
      onChange={event => setHash(event.target.value)}
    />
  </label>
)

export default InputHash
