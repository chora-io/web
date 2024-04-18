'use client'

import { WalletContext } from 'chora/contexts'
import { useParams, useRouter } from 'next/navigation'
import { useContext, useState, useEffect } from 'react'

const Layout = ({ children }: any) => {
  const { chainId } = useParams()
  const { network, setNetwork } = useContext(WalletContext)
  const router = useRouter()

  const [initialChainId, setInitialChainId] = useState<string | null>(null)
  const [initialNetwork, setInitialNetwork] = useState<string | null>(null)

  useEffect(() => {
    if (chainId) {
      setInitialChainId(`${chainId}`)
    }
  }, [chainId])

  useEffect(() => {
    if (network) {
      setInitialNetwork(network)
    }
  }, [network])

  useEffect(() => {
    if (initialNetwork && network !== initialNetwork && chainId !== network) {
      router.push(`/${network}`)
    }
    if (initialChainId && chainId !== initialChainId && chainId !== network) {
      setNetwork(`/${chainId}`)
    }
  }, [chainId, network, initialChainId, initialNetwork, router, setNetwork])

  return <div>{children}</div>
}

export default Layout
