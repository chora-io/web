import * as React from "react"

import { VoteOption } from "chora/api/cosmos/group/v1/types"

const SelectVote = ({ id, label, vote, setVote }: any) => {

  const handleChange = (event: any) => {
    event.preventDefault()
    setVote(event.target.value)
  }

  return (
    <label htmlFor={id ? id : "vote"}>
      {label ? label : "vote"}
      <select
        id={id ? id : "vote"}
        value={vote}
        onChange={handleChange}
      >
        <option value={VoteOption.VOTE_OPTION_UNSPECIFIED}>
          {"--select--"}
        </option>
        <option value={VoteOption.VOTE_OPTION_YES}>
          {"yes"}
        </option>
        <option value={VoteOption.VOTE_OPTION_ABSTAIN}>
          {"abstain"}
        </option>
        <option value={VoteOption.VOTE_OPTION_NO}>
          {"no"}
        </option>
        <option value={VoteOption.VOTE_OPTION_NO_WITH_VETO}>
          {"no with veto"}
        </option>
      </select>
    </label>
  )
}

export default SelectVote
