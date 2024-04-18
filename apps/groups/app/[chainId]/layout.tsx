'use client'

import { WalletContext } from 'chora/contexts'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useContext, useState, useEffect } from 'react'

const Layout = ({ children }: any) => {
  const { chainId } = useParams()
  const currentRoute = usePathname()
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
        const splitRoute = currentRoute.split('/')

        // reroute from network page to network page
        if (splitRoute.length === 2) {
          router.push(currentRoute.replace(splitRoute[1], network))
        }

        // reroute from any subpage to network page
        if (splitRoute.length > 2) {
          router.push(`/${network}`)
        }
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
