import { ThemeContextProvider, WalletContextProvider } from 'chora/contexts'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

import Header from '@components/Header'

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
            {children}
          </WalletContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
