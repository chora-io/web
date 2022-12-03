import * as React from "react"

const placeholder = 1

const InputId = ({ id, setId }: any) => (
  <label htmlFor="id">
    {"id"}
    <input
      id="id"
      value={id}
      placeholder={placeholder}
      onChange={event => setId(event.target.value)}
    />
  </label>
)

export default InputId
