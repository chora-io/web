'use client'

import { WalletContext } from 'chora/contexts'
import { useParams, useRouter } from 'next/navigation'
import { useContext, useState, useEffect } from 'react'

const Layout = ({ children }: any) => {
  const { chainId } = useParams()
  const router = useRouter()
  const { network, setNetwork } = useContext(WalletContext)

  const [initialNetwork, setInitialNetwork] = useState<string | null>(null)

  useEffect(() => {
    if (!initialNetwork && network) {
      setInitialNetwork(network)
    }
  }, [initialNetwork, network])

  useEffect(() => {
    // check if route param does not match network
    if (initialNetwork && chainId !== network) {
      // if network change, update router path
      if (network !== initialNetwork) {
        // reroute from any page to network page
        router.push('/')
      }

      // if route change, update wallet context
      if (network === initialNetwork) {
        setNetwork(chainId)
      }
    }
  }, [chainId, initialNetwork, network, router, setNetwork])

  return <div>{children}</div>
}

export default Layout
