import * as React from 'react'

import { Exec } from 'cosmos/api/cosmos/group/v1/types'

const SelectExecution = ({ id, label, execution, setExecution }: any) => (
  <label htmlFor={id ? id : 'execution'}>
    {label ? label : 'execution'}
    <select
      id={id ? id : 'execution'}
      value={execution}
      onChange={(event) => setExecution(event.target.value)}
    >
      <option value={Exec['EXEC_UNSPECIFIED']}>{'separate'}</option>
      <option value={Exec['EXEC_TRY']}>{'immediate'}</option>
    </select>
  </label>
)

export default SelectExecution
