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
    if (network && !initialNetwork) {
      setInitialNetwork(network)
    }
  }, [network, initialNetwork])

  useEffect(() => {
    // check if route param does not match network
    if (initialNetwork && chainId !== network) {
      // if network change, update router path
      if (network !== initialNetwork) {
        router.push(`/${network}`)
      }

      // if route change, update wallet context
      if (network === initialNetwork) {
        setNetwork(chainId)
      }
    }
  }, [chainId, network, initialNetwork, router, setNetwork])

  return <div>{children}</div>
}

export default Layout
