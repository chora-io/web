import * as React from "react"

import { DigestAlgorithm } from "../../api/regen/data/v1/types"

const SelectDigestAlgorithm = ({ digest, setDigest }: any) => (
  <label htmlFor="digest">
    {"digest algorithm"}
    <select
      id="digest"
      value={digest}
      // @ts-ignore
      onChange={event => setDigest(event.target.value)}
    >
      <option value={DigestAlgorithm.DIGEST_ALGORITHM_UNSPECIFIED}>
        {"unspecified"}
      </option>
      <option value={DigestAlgorithm.DIGEST_ALGORITHM_BLAKE2B_256}>
        {"BLAKE2b-256"}
      </option>
    </select>
  </label>
)

export default SelectDigestAlgorithm
