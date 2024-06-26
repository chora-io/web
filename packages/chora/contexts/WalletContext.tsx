'use client'

import { ChainInfo, Key } from '@keplr-wallet/types'
import {
  bionLocal,
  choraLocal,
  choraTestnet,
  regenLocal,
  regenMainnet,
  regenRedwood,
} from 'cosmos/chains'
import * as React from 'react'
import { createContext, useEffect, useState } from 'react'

const cachedNetworkKey = 'chora-web-network'

const defaultNetwork = choraTestnet.chainId

const WalletContext = createContext<any>({})

const WalletContextProvider = (props: any) => {
  // selected network
  const [network, setNetwork] = useState<string | null>(null)

  // chain info based on connected network
  const [chainInfo, setChainInfo] = useState<ChainInfo | null>(null)

  // wallet loaded from keplr
  const [wallet, setWallet] = useState<any | null>(null)

  // loading wallet from keplr (only when loading from cache)
  const [loading, setLoading] = useState<boolean>(true)

  // error returned from handler and keplr
  const [error, setError] = useState<string | null>(null)

  // keplr event listener
  useEffect(() => {
    window.addEventListener('keplr_keystorechange', handleKeystoreChange)
    return () => {
      window.removeEventListener('keplr_keystorechange', handleKeystoreChange)
    }
  })

  // load network from cache and set chain information and wallet
  useEffect(() => {
    const cachedNetwork = localStorage.getItem(cachedNetworkKey) || ''

    // use default network if none provided
    if (network === null && cachedNetwork === '') {
      setNetwork(defaultNetwork)

      // cache default network to initialize local storage
      localStorage.setItem(cachedNetworkKey, defaultNetwork)
    }

    // connect to keplr using network if network available
    if (network !== null && network !== chainInfo?.chainId) {
      switch (network) {
        case bionLocal.chainId:
          setChainInfo(bionLocal)
          break
        case choraLocal.chainId:
          setChainInfo(choraLocal)
          break
        case choraTestnet.chainId:
          setChainInfo(choraTestnet)
          break
        case regenLocal.chainId:
          setChainInfo(regenLocal)
          break
        case regenMainnet.chainId:
          setChainInfo(regenMainnet)
          break
        case regenRedwood.chainId:
          setChainInfo(regenRedwood)
          break
      }

      // check if network is still enabled
      window.keplr
        ?.enable(network)
        .then(() => {
          // get wallet from connected network
          window.keplr
            ?.getKey(network)
            .then((wallet) => {
              setLoading(false)
              setWallet(wallet)
            })
            .catch(() => {
              setLoading(false)
            })
        })
        .catch(() => {
          setLoading(false)
        })

      return // do not continue
    }

    // connect to keplr using cached network if network not available
    if (
      network === null &&
      cachedNetwork !== '' &&
      cachedNetwork !== chainInfo?.chainId
    ) {
      setNetwork(cachedNetwork)

      switch (cachedNetwork) {
        case bionLocal.chainId:
          setChainInfo(bionLocal)
          break
        case choraLocal.chainId:
          setChainInfo(choraLocal)
          break
        case choraTestnet.chainId:
          setChainInfo(choraTestnet)
          break
        case regenLocal.chainId:
          setChainInfo(regenLocal)
          break
        case regenMainnet.chainId:
          setChainInfo(regenMainnet)
          break
        case regenRedwood.chainId:
          setChainInfo(regenRedwood)
          break
      }

      // check if network is still enabled
      window.keplr
        ?.enable(cachedNetwork)
        .then(() => {
          // get wallet from connected network
          window.keplr
            ?.getKey(cachedNetwork)
            .then((wallet) => {
              setLoading(false)
              setWallet(wallet)
            })
            .catch(() => {
              setLoading(false)
            })
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [network])

  // user initiated connect wallet request
  const getKeplr = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    if (window.keplr && network !== null) {
      let chain: ChainInfo

      switch (network) {
        case bionLocal.chainId:
          chain = bionLocal
          break
        case choraLocal.chainId:
          chain = choraLocal
          break
        case choraTestnet.chainId:
          chain = choraTestnet
          break
        case regenLocal.chainId:
          chain = regenLocal
          break
        case regenMainnet.chainId:
          chain = regenMainnet
          break
        case regenRedwood.chainId:
          chain = regenRedwood
          break
        default:
          chain = choraTestnet
          break
      }

      setChainInfo(chain)

      // enable request rejected
      let rejected = false

      // enable chain based on network and host
      await window.keplr.enable(network).catch(async (err) => {
        // skip setting error if request rejected
        if (err.message !== 'Request rejected') {
          setError(err.message)
        } else {
          rejected = true
        }

        // add chain if matching chain id not found in keplr
        await window.keplr?.experimentalSuggestChain(chain).catch((err) => {
          setError(err.message)
          return // exit on error
        })
      })

      // if enable request not rejected
      if (!rejected) {
        // get wallet from selected network
        await window.keplr
          .getKey(network)
          .then((wallet) => {
            setWallet(wallet)
            setError(null)
          })
          .catch((err) => {
            setError(err.message)
          })
      }
    } else {
      setError('keplr wallet not found')
    }
  }

  // event handler for keplr keystore change
  const handleKeystoreChange = async () => {
    if (window.keplr && network !== null) {
      // get wallet from selected network
      await window.keplr
        .getKey(network)
        .then((wallet: Key) => {
          setWallet(wallet)
        })
        .catch((err) => {
          setError(err.message)
        })
    }
  }

  const handleSetNetwork = (value: string) => {
    setError(null)
    setNetwork(value)
    setWallet(null)
    localStorage.setItem(cachedNetworkKey, value)
  }

  return (
    <WalletContext.Provider
      value={{
        getKeplr,
        network,
        setNetwork: handleSetNetwork,
        chainInfo,
        wallet,
        loading,
        error,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  )
}

export {
  cachedNetworkKey,
  defaultNetwork,
  WalletContext,
  WalletContextProvider,
}
