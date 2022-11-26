import * as React from "react"

import { GraphCanonicalizationAlgorithm } from "../../api/regen/data/v1/types"

const SelectGraphCanon = ({ canon, setCanon }: any) => (
  <label htmlFor="graph-canon">
    {"graph canonicalization algorithm"}
    <select
      id="graph-canon"
      value={canon}
      // @ts-ignore
      onChange={event => setCanon(event.target.value)}
    >
      <option value={GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED}>
        {"unspecified"}
      </option>
      <option value={GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015}>
        {"URDNA2015"}
      </option>
    </select>
  </label>
)

export default SelectGraphCanon
