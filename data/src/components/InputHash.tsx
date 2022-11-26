import * as React from "react"

const placeholder = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="

const InputHash = ({ hash, setHash }: any) => (
  <label htmlFor="hash">
    {"hash"}
    <input
      id="hash"
      value={hash}
      placeholder={placeholder}
      onChange={event => setHash(event.target.value)}
    />
  </label>
)

export default InputHash
