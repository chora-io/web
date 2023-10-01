import {
  bionLocal,
  choraLocal,
  choraTestnet,
  regenLocal,
  regenMainnet,
  regenRedwood,
} from 'cosmos/chains'

const SelectNetwork = ({ network, setNetwork }: any) => {
  let local = false
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname == '0.0.0.0' ||
      window.location.hostname == '127.0.0.1' ||
      window.location.hostname == 'localhost')
  ) {
    local = true
  }

  return (
    <label>
      <select
        value={network}
        onChange={(event) => setNetwork(event.target.value)}
      >
        <option value="">{'-- select network --'}</option>
        {local && (
          <option value={bionLocal.chainId}>{bionLocal.chainId}</option>
        )}
        {local && (
          <option value={choraLocal.chainId}>{choraLocal.chainId}</option>
        )}
        <option value={choraTestnet.chainId}>{choraTestnet.chainId}</option>
        <option value={regenMainnet.chainId}>{regenMainnet.chainId}</option>
        {local && (
          <option value={regenLocal.chainId}>{regenLocal.chainId}</option>
        )}
        <option value={regenRedwood.chainId}>{regenRedwood.chainId}</option>
      </select>
    </label>
  )
}

export default SelectNetwork
