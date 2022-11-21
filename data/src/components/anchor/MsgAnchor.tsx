import * as React from "react"
import { useState } from "react"

import * as styles from "./MsgAnchor.module.css"

import {
  choraLocal,
  choraTestnet,
  regenLocal,
  regenRedwood,
  regenHambach,
} from "../../utils/chains"

const MsgAnchor = () => {

  const [data, setData] = useState("");
  const [network, setNetwork] = useState(choraLocal.chainId);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    let chainId
    switch (network) {
      case choraLocal.chainId:
        chainId = choraLocal
        break
      case choraTestnet.chainId:
        chainId = choraTestnet
        break
      case regenLocal.chainId:
        chainId = regenLocal
        break
      case regenRedwood.chainId:
        chainId = regenRedwood
        break
      case regenHambach.chainId:
        chainId = regenHambach
        break
    }

    // TODO: refactor connect wallet state
    const signer = "regen1jx34255cgvxpthkg572ma6rhq6crwl6x2s4ajx"

    // TODO: generate body bytes
    const bodeBytes = null

    // TODO: generate auth info bytes
    const authInfoBytes = null

    // TODO: fetch account number
    const accountNumber = null

    const signDoc = {
      bodeBytes: bodeBytes,
      authInfoBytes: authInfoBytes,
      chainId: chainId,
      accountNumber: accountNumber,
    }

    // @ts-ignore
    window.keplr.signDirect(chainId, signer, signDoc).then(res => {
      console.log(res)
      setResponse(res)
    }).catch(err => {
      console.log(err.message)
      setError(err.message)
      return // exit on error
    })

    // TODO: generate tx bytes
    const tx = null

    // TODO: choose broadcast mode
    const mode = null

    // @ts-ignore
    window.keplr.sendTx(chainId, tx, mode).then(res => {
      console.log(res)
      setResponse(res)
    }).catch(err => {
      console.log(err.message)
      setError(err.message)
    })
  }

  return (
    <>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="data">
            {"data"}
            <textarea
              id="data"
              value={data}
              onChange={event => setData(event.target.value)}
            />
          </label>
          <label htmlFor="network">
            {"network"}
            <select
              id="network"
              value={network}
              onChange={event => setNetwork(event.target.value)}
            >
              <option value={choraLocal.chainId}>
                {choraLocal.chainId}
              </option>
              <option value={choraTestnet.chainId}>
                {choraTestnet.chainId}
              </option>
              <option value={regenLocal.chainId}>
                {regenLocal.chainId}
              </option>
              <option value={regenRedwood.chainId}>
                {regenRedwood.chainId}
              </option>
              <option value={regenHambach.chainId}>
                {regenHambach.chainId}
              </option>
            </select>
          </label>
          <button type="submit">
            {"anchor"}
          </button>
        </form>
      </div>
      {error != "" && (
        <div className={styles.error}>
          {error}
        </div>
      )}
      {response != "" && (
        <div>
          {response}
        </div>
      )}
    </>
  )
}

export default MsgAnchor
