'use client'

import { WalletContext } from 'chora/contexts'
import { useParams, useRouter } from 'next/navigation'
import { useContext, useState, useEffect } from 'react'

const Layout = ({ children }: any) => {
  const { chainId } = useParams()
  const router = useRouter()

  const { network, setNetwork } = useContext(WalletContext)

  const [initNetwork, setInitNetwork] = useState<string | null>(null)

  useEffect(() => {
    if (network && !initNetwork) {
      setInitNetwork(network)
    }
  }, [network, initNetwork])

  useEffect(() => {
    // check if route param does not match network
    if (network && initNetwork && chainId !== network) {
      // if network change, update router path
      if (network !== initNetwork) {
        // reroute from any page to network page
        router.push('/')
      }

      // if route change, update wallet context
      if (network === initNetwork) {
        setNetwork(chainId)
      }
    }
  }, [chainId, router, network, setNetwork, initNetwork])

  return <>{children}</>
}

export default Layout
