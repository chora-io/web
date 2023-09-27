'use client'

import { WalletContextProvider } from 'chora'

const FaucetLayout = ({ children }: any) => {
  return <WalletContextProvider>{children}</WalletContextProvider>
}

export default FaucetLayout
