import * as React from "react"

import { GraphMerkleTree } from "../../api/regen/data/v1/types"

const SelectGraphMerkle = ({ id, label, merkle, setMerkle }: any) => (
  <label htmlFor={id ? id : "merkle"}>
    {label ? label : "merkle tree type"}
    <select
      id={id ? id : "merkle"}
      value={merkle}
      onChange={event => setMerkle(event.target.value)}
      disabled
    >
      <option value={GraphMerkleTree["GRAPH_MERKLE_TREE_NONE_UNSPECIFIED"]}>
        {"UNSPECIFIED"}
      </option>
    </select>
  </label>
)

export default SelectGraphMerkle
