'use client'

import { WalletContext } from 'chora/contexts'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useContext, useState, useEffect } from 'react'

const Layout = ({ children }: any) => {
  const { chainId } = useParams()
  const pathname = usePathname()
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
        const splitRoute = pathname.split('/')

        // use current pathname but replace network parameter
        router.push(pathname.replace(splitRoute[1], network))
      }

      // if route change, update wallet context
      if (network === initialNetwork) {
        setNetwork(chainId)
      }
    }
  }, [chainId, initialNetwork, network, pathname, router, setNetwork])

  return <>{children}</>
}

export default Layout
