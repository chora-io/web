import * as React from 'react'

const SelectExecution = ({ id, label, execution, setExecution }: any) => (
  <label htmlFor={id ? id : 'execution'}>
    {label ? label : 'execution'}
    <select
      id={id ? id : 'execution'}
      value={execution}
      onChange={(event) => setExecution(event.target.value)}
    >
      <option value={'EXEC_UNSPECIFIED'}>{'separate'}</option>
      <option value={'EXEC_TRY'}>{'immediate'}</option>
    </select>
  </label>
)

export default SelectExecution
