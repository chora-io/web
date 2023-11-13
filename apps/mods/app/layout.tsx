import { HeaderWallet as Header } from 'chora/components'
import { ThemeContextProvider, WalletContextProvider } from 'chora/contexts'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

import Sidebar from '@components/Sidebar'

import './globals.css'

const Layout = ({ children }: any) => (
  <html lang="en">
    <body>
      <main>
        <ThemeContextProvider>
          <WalletContextProvider>
            <Header
              title={{
                link: PHASE_DEVELOPMENT_SERVER
                  ? 'http://localhost:8000'
                  : 'https://chora.io',
                titleX: '',
              }}
            />
            <Sidebar />
            {children}
          </WalletContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
