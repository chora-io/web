import * as React from 'react'

const defaultId = 'credit type'
const defaultLabel = 'credit type'

const SelectCreditClass = ({
  id,
  label,
  options,
  selected,
  setSelected,
}: any) => (
  <label htmlFor={id ? id : defaultId}>
    {label ? label : defaultLabel}
    <select
      id={id ? id : defaultId}
      value={selected}
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
