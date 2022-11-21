import * as React from "react"
import { useState } from "react"
import { ChainInfo } from "@keplr-wallet/types"

import * as styles from "./ConnectWallet.module.css"

import {
  choraLocal,
  choraTestnet,
  regenLocal,
  regenRedwood,
  regenHambach,
} from "../utils/chains"

const ConnectWallet = () => {

  const [network, setNetwork] = useState<string>(choraLocal.chainId);
  const [response, setResponse] = useState<string>("");
  const [keplr, setKeplr] = useState<any>()
  const [key, setKey] = useState<any>()
  const [error, setError] = useState<string>("")

  const getKeplr = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (window.keplr) {
      console.log(window.keplr)
      setKeplr(window.keplr)

      let chainInfo: ChainInfo
      switch (network) {
        case choraLocal.chainId:
          chainInfo = choraLocal
          break
        case choraTestnet.chainId:
          chainInfo = choraTestnet
          break
        case regenLocal.chainId:
          chainInfo = regenLocal
          break
        case regenRedwood.chainId:
          chainInfo = regenRedwood
          break
        case regenHambach.chainId:
          chainInfo = regenHambach
          break
      }

      // enable chain
      await window.keplr.enable(network).then(() => {
        console.log(network + " enabled")
        setResponse(network + " enabled")
      }).catch(async err => {
        console.log(err.message)
        setError(err.message)

        // @ts-ignore
        await window.keplr.experimentalSuggestChain(chainInfo).then(() => {
          console.log("added " + network)
          setResponse("added " + network)
          setError("")
        }).catch(err => {
          console.log(err.message)
          setError(err.message)
        })
      })

      // get active key
      await window.keplr.getKey(network).then(key => {
        console.log(network + " key", key)
        setKey(key)
        setError("")
      }).catch(err => {
        console.log(err.message)
        setError(err.message)
      })
    }

    if (document.readyState === "complete") {
      console.log("ready state complete", window.keplr)
      setKeplr(window.keplr)
      setError("")
    }

    const windowStateChange = async (event: Event) => {
      console.log("window state change", event)

      // get active key
      if (window && window.keplr) {
        await window.keplr.getKey(network).then((key: any) => {
          console.log(network + " key", key)
          setKey(key)
          setError("")
        }).catch((err: { message: string }) => {
          console.log(err.message)
          setError(err.message)
        })
      }
    }

    const documentStateChange = (event: Event) => {
      console.log("document state change", event)

      if (event.target && (event.target as Document).readyState === "complete") {
        console.log("ready state complete", event)

        document.removeEventListener("readystatechange", documentStateChange)
        window.removeEventListener("keplr_keystorechange", windowStateChange)
      }
    }

    document.addEventListener("readystatechange", documentStateChange)
    window.addEventListener("keplr_keystorechange", windowStateChange)
  }

  return (
    <div>
      <form className={styles.form} onSubmit={getKeplr}>
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
          {keplr == null ?
            <span>{"connect wallet"}</span>
          :
            <span>{"wallet connected"}</span>
          }
        </button>
      </form>
      {error != "" &&
        <div className={styles.error}>
          {error}
        </div>
      }
      {key != null &&
        <div className={styles.response}>
          {key.bech32Address.substring(0, 10) + "..." + key.bech32Address.substring(38, 44)}
        </div>
      }
      {response != "" &&
        <div className={styles.response}>
          {response}
        </div>
      }
    </div>
  )
}

export default ConnectWallet
