import * as React from "react"

const SelectDataType = ({ type, setType }: any) => (
  <label htmlFor="data-type">
    {"data type"}
    <select
      id="data-type"
      value={type}
      onChange={event => setType(event.target.value)}
    >
      <option>
        {"--- select ---"}
      </option>
      <option value="graph">
        {"graph"}
      </option>
      <option value="raw">
        {"raw"}
      </option>
    </select>
  </label>
)

export default SelectDataType
