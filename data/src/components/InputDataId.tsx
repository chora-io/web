import * as React from "react"

const placeholder = "1"

const InputDataId = ({ id, setId }: any) => (
  <label htmlFor="data-id">
    {"data id"}
    <input
      id="data-id"
      value={id}
      placeholder={placeholder}
      onChange={event => setId(event.target.value)}
    />
  </label>
)

export default InputDataId
