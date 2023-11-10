import { DigestAlgorithm } from 'cosmos/api/regen/data/v1/types'
import * as React from 'react'

const defaultId = 'digest-algorithm'
const defaultLabel = 'digest algorithm'

const SelectDigestAlgorithm = ({ id, label, digest, setDigest }: any) => (
  <label htmlFor={id ? id : defaultId}>
    {label ? label : defaultLabel}
    <select
      id={id ? id : defaultId}
      value={digest}
      onChange={(event) => setDigest(event.target.value)}
      disabled // disabled until multiple options exist
    >
      <option value={DigestAlgorithm['DIGEST_ALGORITHM_BLAKE2B_256']}>
        {'BLAKE2B_256'}
      </option>
    </select>
  </label>
)

export default SelectDigestAlgorithm
