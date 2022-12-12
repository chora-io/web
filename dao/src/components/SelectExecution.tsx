import * as React from "react"

import { Exec } from "../../api/cosmos/group/v1/types"

const SelectExecution = ({ id, label, execution, setExecution }: any) => {

  const handleChange = (event: any) => {
    event.preventDefault()
    setExecution(event.target.value)
  }

  return (
    <label htmlFor={id ? id : "execution"}>
      {label ? label : "execution"}
      <select
        id={id ? id : "execution"}
        value={execution}
        onChange={handleChange}
      >
        <option value={Exec.EXEC_UNSPECIFIED}>
          {"require separate"}
        </option>
        <option value={Exec.EXEC_TRY}>
          {"try immediately"}
        </option>
      </select>
    </label>
  )
}

export default SelectExecution
