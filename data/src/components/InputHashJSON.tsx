import * as React from "react"

const placeholder = `{
  "contentHash": {
    "graph": {
      "hash": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
      "digestAlgorithm": "DIGEST_ALGORITHM_BLAKE2B_256",
      "canonicalizationAlgorithm": "GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015",
      "merkleTree": "GRAPH_MERKLE_TREE_NONE_UNSPECIFIED"
    }
  }
}`

const InputHashJSON = ({ json, setJson }: any) => (
  <label htmlFor="hash-json">
    {"content hash json"}
    <textarea
      id="hash-json"
      value={json}
      placeholder={placeholder}
      onChange={event => setJson(event.target.value)}
    />
  </label>
)

export default InputHashJSON
