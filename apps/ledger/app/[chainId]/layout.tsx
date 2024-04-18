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
    if (initialNetwork && network !== initialNetwork && chainId !== network) {
      // TODO: reconsider this layout routing variation when adding params
      const slitRoute = currentRoute.split('/')
      const nextRoute = currentRoute.replace(slitRoute[1], network)
      router.push(nextRoute)
    }
    if (initialNetwork && network === initialNetwork && chainId !== network) {
      setNetwork(chainId)
    }
  }, [chainId, network, initialNetwork, router, setNetwork])

  return <div>{children}</div>
}

export default Layout
