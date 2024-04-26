import * as React from 'react'

const defaultId = 'batch-denom'
const defaultLabel = 'batch denom'

const defaultPlaceholder = 'C01-001-20200101-20201231-01'

const InputBatchDenom = ({
  id,
  label,
  placeholder,
  batchDenom,
  setBatchDenom,
}: any) => {
  return (
    <label htmlFor={id ? id : defaultId}>
      {label ? label : defaultLabel}
      <input
        id={id ? id : defaultId}
        value={batchDenom}
        placeholder={placeholder || defaultPlaceholder}
        onChange={(event) => setBatchDenom(event.target.value)}
      />
    </label>
  )
}

export default InputBatchDenom
