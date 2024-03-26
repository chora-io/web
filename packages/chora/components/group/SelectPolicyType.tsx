import * as React from 'react'

const defaultId = 'decision-policy-type'
const defaultLabel = 'decision policy type'

const SelectPolicyType = ({ id, label, type, setType }: any) => (
  <label htmlFor={id ? id : defaultId}>
    {label ? label : defaultLabel}
    <select
      id={id ? id : defaultId}
      value={type}
      onChange={(event) => setType(event.target.value)}
    >
      <option value="threshold">{'threshold'}</option>
      <option value="percentage">{'percentage'}</option>
    </select>
  </label>
)

export default SelectPolicyType
