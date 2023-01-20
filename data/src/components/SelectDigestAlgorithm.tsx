import * as React from "react"

import { DigestAlgorithm } from "chora/api/regen/data/v1/types"

const SelectDigestAlgorithm = ({ id, label, digest, setDigest }: any) => (
  <label htmlFor={id ? id : "digest"}>
    {label ? label : "digest algorithm"}
    <select
      id={id ? id : "digest"}
      value={digest}
      onChange={event => setDigest(event.target.value)}
      disabled
    >
      <option value={DigestAlgorithm["DIGEST_ALGORITHM_BLAKE2B_256"]}>
        {"BLAKE2B_256"}
      </option>
    </select>
  </label>
)

export default SelectDigestAlgorithm
