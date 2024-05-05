import * as React from 'react'

const defaultId = 'vote'
const defaultLabel = 'vote'

const SelectVote = ({ id, label, vote, setVote }: any) => (
  <label htmlFor={id ? id : defaultId}>
    {label ? label : defaultLabel}
    <select
      id={id ? id : defaultId}
      value={vote}
      onChange={(event) => setVote(event.target.value)}
    >
      <option value={'VOTE_OPTION_UNSPECIFIED'}>{'--select--'}</option>
      <option value={'VOTE_OPTION_YES'}>{'yes'}</option>
      <option value={'VOTE_OPTION_ABSTAIN'}>{'abstain'}</option>
      <option value={'VOTE_OPTION_NO'}>{'no'}</option>
      <option value={'VOTE_OPTION_NO_WITH_VETO'}>{'no with veto'}</option>
    </select>
  </label>
)

export default SelectVote
