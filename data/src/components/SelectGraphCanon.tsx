import * as React from "react"

import { GraphCanonicalizationAlgorithm } from "chora/api/regen/data/v1/types"

const SelectGraphCanon = ({ id, label, canon, setCanon }: any) => (
  <label htmlFor={id ? id : "canon"}>
    {label ? label : "canonicalization algorithm"}
    <select
      id={id ? id : "canon"}
      value={canon}
      onChange={event => setCanon(event.target.value)}
      disabled
    >
      <option value={GraphCanonicalizationAlgorithm["GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015"]}>
        {"URDNA2015"}
      </option>
    </select>
  </label>
)

export default SelectGraphCanon
