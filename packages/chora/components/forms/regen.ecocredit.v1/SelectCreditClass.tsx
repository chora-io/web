import * as React from 'react'

const defaultId = 'credit class'
const defaultLabel = 'credit class'

const SelectCreditClass = ({ id, label, options, setSelected }: any) => (
  <label htmlFor={id ? id : defaultId}>
    {label ? label : defaultLabel}
    <select
      id={id ? id : defaultId}
      onChange={(event) => setSelected(event.target.value)}
    >
      <option value="">{'--- select ---'}</option>
      {options?.map((o: any) => (
        <option key={o['id']} value={o['id']}>
          {o['id']}
        </option>
      ))}
    </select>
  </label>
)

export default SelectCreditClass
