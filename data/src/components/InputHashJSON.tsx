import * as React from "react"

const placeholder = `{
  "graph": {
    "hash": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
    "digestAlgorithm": "DIGEST_ALGORITHM_BLAKE2B_256",
    "canonicalizationAlgorithm": "GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015",
    "merkleTree": "GRAPH_MERKLE_TREE_NONE_UNSPECIFIED"
  }
}`

const InputHashJSON = ({ id, label, json, setJson }: any) => (
  <label htmlFor={id ? id : "content-hash-json"}>
    {label ? label : "content hash json"}
    <textarea
      id={id ? id : "content-hash-json"}
      value={json}
      placeholder={placeholder}
      onChange={event => setJson(event.target.value)}
    />
  </label>
)

export default InputHashJSON
