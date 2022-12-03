import * as React from "react"
import { createContext, useEffect, useState } from "react"

import { ChainInfo, Key } from "@keplr-wallet/types"

import {
  choraLocal,
  choraTestnet,
  regenLocal,
  regenRedwood,
  regenHambach,
} from "../utils/chains"

const cachedAddressKey = "chora-header-address"
const cachedConnectedKey = "chora-header-connected"
const cachedNetworkKey = "chora-network"

const WalletContext = createContext({}) // TODO

const WalletContextProvider = (props: any) => {

  // selected network
  const [network, setNetwork] = useState<string>(choraTestnet.chainId)

  // chain info based on connected network
  const [chainInfo, setChainInfo] = useState<ChainInfo | null>(null)

  // wallet loaded from keplr
  const [wallet, setWallet] = useState<any>() // TODO

  // error returned from handler and keplr
  const [error, setError] = useState<string>("")

  // event listeners
  useEffect(() => {
    window.addEventListener("keplr_keystorechange", keplrKeystoreChange)
    return () => {
      window.removeEventListener("keplr_keystorechange", keplrKeystoreChange)
    }
  })

  // load from cache
  useEffect(() => {
    const cachedNetwork = localStorage.getItem(cachedNetworkKey)

    if (cachedNetwork != null && cachedNetwork != chainInfo?.chainId) {
      setNetwork(cachedNetwork)

      // only set chain info after successfully connecting
      let chain: ChainInfo

      switch (network) {
        case choraLocal.chainId:
          chain = choraLocal
          break
        case choraTestnet.chainId:
          chain = choraTestnet
          break
        case regenLocal.chainId:
          chain = regenLocal
          break
        case regenRedwood.chainId:
          chain = regenRedwood
          break
        case regenHambach.chainId:
          chain = regenHambach
          break
      }

      // check if network is still enabled
      window.keplr?.enable(network).then(() => {

        // get wallet from connected network
        window.keplr?.getKey(network).then(wallet => {
          setChainInfo(chain)
          setWallet(wallet)
          setError("")
        }).catch(err => {

          // clean up local storage if request rejected
          if (err.message == "Request rejected") {
            localStorage.removeItem(cachedConnectedKey)
            localStorage.removeItem(cachedAddressKey)
          }
        })
       }).catch(err => {

        // clean up local storage if no longer enabled
        if (err.message.includes("no chain info")) {
          localStorage.removeItem(cachedConnectedKey)
          localStorage.removeItem(cachedAddressKey)
        }
      })
    }
  })

  // user initiated connect waller request
  const getKeplr = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    if (window.keplr) {

      // only set chain info after successfully connecting
      let chain: ChainInfo

      switch (network) {
        case choraLocal.chainId:
          chain = choraLocal
          break
        case choraTestnet.chainId:
          chain = choraTestnet
          break
        case regenLocal.chainId:
          chain = regenLocal
          break
        case regenRedwood.chainId:
          chain = regenRedwood
          break
        case regenHambach.chainId:
          chain = regenHambach
          break
      }

      // request rejected
      let rejected = false

      // enable chain based on network and host
      await window.keplr.enable(network).catch(async err => {

        // skip setting error if request rejected
        if (err.message != "Request rejected") {
          setError(err.message)
        } else {
          rejected = true
        }

        // add chain if matching chain id not found in keplr
        await window.keplr?.experimentalSuggestChain(chain).catch(err => {
          setError(err.message)
          return // exit on error
        })
      })

      // if keplr enable request was not rejected
      if (!rejected) {

        // get wallet from selected network
        await window.keplr.getKey(network).then(wallet => {
          setChainInfo(chain)
          setWallet(wallet)
          setError("")
        }).catch(err => {
          setError(err.message)
        })
      }
    } else {
      setError("keplr not found")
    }
  }

  // event handler for keplr keystore change
  const keplrKeystoreChange = async () => {
    if (window.keplr) {

      // get wallet from selected network
      await window.keplr.getKey(network).then((wallet: Key) => {
        setWallet(wallet)
      }).catch(err => {
        setError(err.message)
      })
    }
  }

  return (
    <WalletContext.Provider value={{
      getKeplr,
      network,
      setNetwork,
      chainInfo,
      setChainInfo,
      wallet,
      setWallet,
      error,
      setError,
    }}>
      {props.children}
    </WalletContext.Provider>
  )
}

export {
  cachedAddressKey,
  cachedConnectedKey,
  cachedNetworkKey,
  WalletContext,
  WalletContextProvider,
}
