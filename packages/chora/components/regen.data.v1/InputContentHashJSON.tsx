import * as React from 'react'

const defaultId = 'content-hash'
const defaultLabel = 'content hash'

const defaultPlaceholder = `{
  "graph": {
    "hash": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
    "digestAlgorithm": "DIGEST_ALGORITHM_BLAKE2B_256",
    "canonicalizationAlgorithm": "GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015",
    "merkleTree": "GRAPH_MERKLE_TREE_NONE_UNSPECIFIED"
  }
}`

const InputContentHashJSON = ({
  id,
  label,
  placeholder,
  json,
  setJson,
}: any) => {
  let noLabel = false
  if (label === '') noLabel = true

  return (
    <label htmlFor={id ? id : defaultId}>
      {!noLabel && (label ? label : defaultLabel)}
      <textarea
        id={id ? id : defaultId}
        value={json}
        placeholder={placeholder ? placeholder : defaultPlaceholder}
        onChange={(event) => setJson(event.target.value)}
      />
    </label>
  )
}

export default InputContentHashJSON
