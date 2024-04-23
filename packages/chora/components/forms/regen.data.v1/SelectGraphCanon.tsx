import { GraphCanonicalizationAlgorithm } from 'cosmos/api/regen/data/v1/types'
import * as React from 'react'

const defaultId = 'graph-canon'
const defaultLabel = 'canonicalization algorithm'

const SelectGraphCanon = ({ id, label, canon, setCanon }: any) => (
  <label htmlFor={id ? id : defaultId}>
    {label ? label : defaultLabel}
    <select
      id={id ? id : defaultId}
      value={canon}
      onChange={(event) => setCanon(event.target.value)}
      disabled // disabled until multiple options exist
    >
      <option
        value={
          GraphCanonicalizationAlgorithm[
            'GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015'
          ]
        }
      >
        {'URDNA2015'}
      </option>
    </select>
  </label>
)

export default SelectGraphCanon
