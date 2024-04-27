import * as React from 'react'

const defaultId = 'select-option'
const defaultLabel = 'select option'

const SelectOption = ({ id, label, options, setSelected }: any) => {
  const handleSetSelected = (event: any) => {
    setSelected(event.target.value)
  }

  return (
    <label htmlFor={id ? id : defaultId}>
      {label ? label : defaultLabel}
      <select id={id ? id : defaultId} onChange={handleSetSelected}>
        {options.map((option: any) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default SelectOption
