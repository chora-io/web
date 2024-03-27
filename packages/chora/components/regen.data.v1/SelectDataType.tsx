import * as React from 'react'

const defaultId = 'data-type'
const defaultLabel = 'data type'

const SelectDataType = ({ id, label, type, setType }: any) => (
  <label htmlFor={id ? id : defaultId}>
    {label ? label : defaultLabel}
    <select
      id={id ? id : defaultId}
      value={type}
      onChange={(event) => setType(event.target.value)}
    >
      <option value="graph">{'graph'}</option>
      <option value="raw">{'raw'}</option>
    </select>
  </label>
)

export default SelectDataType
