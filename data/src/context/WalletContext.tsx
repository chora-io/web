import * as React from "react"
import { createContext, useState } from "react"

import { ChainInfo, Key } from "@keplr-wallet/types"

import {
  choraLocal,
  choraTestnet,
  regenLocal,
  regenRedwood,
  regenHambach,
} from "../utils/chains"

const WalletContext = createContext({}) // TODO

const WalletContextProvider = (props: any) => {

  const [network, setNetwork] = useState<string>(choraTestnet.chainId);
  const [chainInfo, setChainInfo] = useState<ChainInfo>(choraTestnet);
  const [keplr, setKeplr] = useState<any>() // TODO
  const [wallet, setWallet] = useState<any>() // TODO
  const [error, setError] = useState<string>("")

  const documentStateChange = (event: Event) => {
    if (event.target && (event.target as Document).readyState === "complete") {
      document.removeEventListener("readystatechange", documentStateChange)
      window.removeEventListener("keplr_keystorechange", windowStateChange)
    }
  }

  const windowStateChange = async (event: Event) => {

    // get active key
    await window?.keplr?.getKey(network).then((wallet: Key) => {
        setWallet(wallet)
      }).catch((err: { message: string }) => {
        setError(err.message)
      })
  }

  const getKeplr = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setError("")

    if (window.keplr) {
      setKeplr(window.keplr)

      switch (network) {
        case choraLocal.chainId:
          setChainInfo(choraLocal)
          break
        case choraTestnet.chainId:
          setChainInfo(choraTestnet)
          break
        case regenLocal.chainId:
          setChainInfo(regenLocal)
          break
        case regenRedwood.chainId:
          setChainInfo(regenRedwood)
          break
        case regenHambach.chainId:
          setChainInfo(regenHambach)
          break
      }

      // enable chain
      await window.keplr.enable(network).then(() => {
        console.log(network + " enabled")
      }).catch(async err => {
        setError(err.message)

        await window.keplr?.experimentalSuggestChain(chainInfo).then(() => {
          console.log(network + " added")
        }).catch(err => {
          setError(err.message)
        })
      })

      // get active key
      await window.keplr.getKey(network).then(wallet => {
        setWallet(wallet)
      }).catch(err => {
        setError(err.message)
      })
    } else {
        setError("keplr not installed")
    }

    if (document.readyState === "complete") {
      setKeplr(window.keplr)
    }

    document.addEventListener("readystatechange", documentStateChange)
    window.addEventListener("keplr_keystorechange", windowStateChange)
  }

  const loadKeplr = async () => {
    if (window.keplr) {
      setKeplr(window.keplr)

      switch (network) {
        case choraLocal.chainId:
          setChainInfo(choraLocal)
          break
        case choraTestnet.chainId:
          setChainInfo(choraTestnet)
          break
        case regenLocal.chainId:
          setChainInfo(regenLocal)
          break
        case regenRedwood.chainId:
          setChainInfo(regenRedwood)
          break
        case regenHambach.chainId:
          setChainInfo(regenHambach)
          break
      }

      // get active key
      await window.keplr.getKey(network).then(wallet => {
        setWallet(wallet)
      }).catch(err => {
        setError(err.message)
      })
    }

    document.addEventListener("readystatechange", documentStateChange)
    window.addEventListener("keplr_keystorechange", windowStateChange)
  }

  return (
    <WalletContext.Provider value={{
      getKeplr,
      loadKeplr,
      keplr,
      wallet,
      error,
      chainInfo,
      setChainInfo,
      network,
      setNetwork,
    }}>
      {props.children}
    </WalletContext.Provider>
  )
}

export { WalletContext, WalletContextProvider }