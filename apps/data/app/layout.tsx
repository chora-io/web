import { HeaderWallet as Header, Sidebar } from 'chora/components'
import { ThemeContextProvider, WalletContextProvider } from 'chora/contexts'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

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
            <Sidebar
              items={[
                {
                  link: '/',
                  title: 'home',
                },
                {
                  link: '/search',
                  title: 'search',
                },
                {
                  link: '/convert',
                  title: 'convert',
                },
                {
                  link: '/server',
                  title: 'server',
                },
              ]}
            />
            {children}
          </WalletContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
