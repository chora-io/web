import * as React from "react"

const defaultId = "boolean"
const defaultLabel = "boolean"

const SelectBoolean = ({ id, label, boolean, setBoolean }: any) => (
  <label htmlFor={id ? id : defaultId}>
    {label ? label : defaultLabel}
    <select
      id={id ? id : defaultId}
      value={boolean}
      onChange={event => setBoolean(event.target.value)}
    >
      <option value={"true"}>
        {"true"}
      </option>
      <option value={"false"}>
        {"false"}
      </option>
    </select>
  </label>
)

export default SelectBoolean
