import * as React from "react"

import { GraphMerkleTree } from "../api/regen/data/v1/types"

const defaultId = "graph-merkle"
const defaultLabel = "merkle tree type"

const SelectGraphMerkle = ({ id, label, merkle, setMerkle }: any) => (
  <label htmlFor={id ? id : defaultId}>
    {label ? label : defaultLabel}
    <select
      id={id ? id : defaultId}
      value={merkle}
      onChange={event => setMerkle(event.target.value)}
      disabled // disabled until multiple options exist
    >
      <option value={GraphMerkleTree["GRAPH_MERKLE_TREE_NONE_UNSPECIFIED"]}>
        {"UNSPECIFIED"}
      </option>
    </select>
  </label>
)

export default SelectGraphMerkle
