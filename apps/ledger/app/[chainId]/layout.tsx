'use client'

import { WalletContext } from 'chora/contexts'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useContext, useState, useEffect } from 'react'

const Layout = ({ children }: any) => {
  const { chainId } = useParams()
  const currentRoute = usePathname()
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
        const splitRoute = currentRoute.split('/')

        // use current route but replace network parameter
        router.push(currentRoute.replace(splitRoute[1], network))
      }

      // if route change, update wallet context
      if (network === initNetwork) {
        setNetwork(chainId)
      }
    }
  }, [chainId, currentRoute, router, network, setNetwork, initNetwork])

  return <>{children}</>
}

export default Layout
