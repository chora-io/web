import * as React from 'react'

const defaultId = 'credit type'
const defaultLabel = 'credit type'

const SelectCreditType = ({
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
        <option key={o['abbreviation']} value={o['abbreviation']}>
          {`${o['name']} (${o['abbreviation']}, ${o['precision']}, ${o['unit']})`}
        </option>
      ))}
    </select>
  </label>
)

export default SelectCreditType
