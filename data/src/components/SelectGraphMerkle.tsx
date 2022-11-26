import * as React from "react"

import { GraphMerkleTree } from "../../api/regen/data/v1/types"

const SelectGraphMerkle = ({ merkle, setMerkle }: any) => (
  <label htmlFor="graph-merkle">
    {"graph merkle tree type"}
    <select
      id="graph-merkle"
      value={merkle}
      // @ts-ignore
      onChange={event => setMerkle(event.target.value)}
    >
      <option value={GraphMerkleTree.GRAPH_MERKLE_TREE_NONE_UNSPECIFIED}>
        {"unspecified"}
      </option>
    </select>
  </label>
)

export default SelectGraphMerkle
