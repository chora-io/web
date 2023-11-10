import { WalletContextProvider } from 'chora/contexts'

const FaucetLayout = ({ children }: any) => {
  return <WalletContextProvider>{children}</WalletContextProvider>
}

export default FaucetLayout
