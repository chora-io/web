import { HeaderWallet as Header } from 'chora/components'
import { ThemeContextProvider, WalletContextProvider } from 'chora/contexts'

import './globals.css'

const Layout = ({ children }: any) => (
  <html lang="en">
    <body>
      <main>
        <ThemeContextProvider>
          <WalletContextProvider>
            <Header
              title={{
                link: '/',
                titleX: 'faucet',
              }}
              testnets={true}
            />
            {children}
          </WalletContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
