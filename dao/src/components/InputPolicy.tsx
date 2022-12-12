import * as React from "react"
import { useState } from "react"

import * as styles from "./InputPolicy.module.css"

const thresholdPlaceholder = "1"
const percentagePlaceholder = "1"
const periodPlaceholder = "1"

const InputPolicy = ({ label, policy, setPolicy }: any) => {

  const [type, setType] = useState<string>("threshold")

  // count is used to trigger component view refresh
  const [count, setCount] = useState<number>(0)

  const handleType = (event) => {
    let p = policy
    p[type] = ""
    setType(event.target.value)
    setPolicy(p)
  }

  const handleChange = (id, event) => {
    let p = policy
    p[id] = event.target.value
    setPolicy(p)

    // trigger component view refresh
    setCount(count+1)
  }

  const handleChangeWindows = (id, event) => {
    let p = policy
    p.windows[id] = event.target.value
    setPolicy(p)

    // trigger component view refresh
    setCount(count+1)
  }

  return (
    <span className={styles.policy}>
      {label ? label : "decision policy"}
      <label htmlFor="policy-type">
        {"decision policy type"}
        <select
          id="policy-type"
          value={type}
          onChange={event => handleType(event)}
        >
          <option value="threshold">
            {"threshold"}
          </option>
          <option value="percentage">
            {"percentage"}
          </option>
        </select>
      </label>
      {type == "threshold" ? (
        <label htmlFor="policy-threshold">
          {"decision policy threshold"}
          <input
            id="policy-threshold"
            value={policy.threshold}
            placeholder={thresholdPlaceholder}
            onChange={event => handleChange("threshold", event)}
          />
        </label>
      ) : (
        <label htmlFor="policy-percentage">
          {"decision policy percentage"}
          <input
            id="policy-percentage"
            value={policy.percentage}
            placeholder={percentagePlaceholder}
            onChange={event => handleChange("percentage", event)}
          />
        </label>
      )}
      <label htmlFor="policy-voting-period">
        {"decision policy voting period"}
        <input
          id="policy-voting-period"
          value={policy.windows.votingPeriod}
          placeholder={periodPlaceholder}
          onChange={event => handleChangeWindows("votingPeriod", event)}
        />
      </label>
      <label htmlFor="policy-execution-period">
        {"decision policy execution period"}
        <input
          id="policy-execution-period"
          value={policy.windows.minExecutionPeriod}
          placeholder={periodPlaceholder}
          onChange={event => handleChangeWindows("minExecutionPeriod", event)}
        />
      </label>
    </span>
  )
}

export default InputPolicy
