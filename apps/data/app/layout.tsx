import { HeaderWallet as Header, Sidebar } from 'chora/components'
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
                link:
                  process.env.NODE_ENV === 'development'
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
