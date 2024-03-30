'use client'

import { WalletContext } from 'chora/contexts'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

const Layout = ({ children }: any) => {
  const { network } = useContext(WalletContext)
  const router = useRouter()

  const [initial, setInitial] = useState(network)

  useEffect(() => {
    if (!initial) {
      setInitial(network)
    } else if (initial !== network) {
      router.push('/claims')
    }
  }, [initial, network, router])

  return <div>{children}</div>
}

export default Layout
