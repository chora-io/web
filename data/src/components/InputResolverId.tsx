import * as React from "react"

const placeholder = "1"

const InputResolverId = ({ id, setId }: any) => (
  <label htmlFor="resolver-id">
    {"resolver id"}
    <input
      id="resolver-id"
      value={id}
      placeholder={placeholder}
      onChange={event => setId(event.target.value)}
    />
  </label>
)

export default InputResolverId
