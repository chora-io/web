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
                  link: '/policies',
                  title: 'policies',
                },
                {
                  link: '/members',
                  title: 'members',
                },
                {
                  link: '/proposals',
                  title: 'proposals',
                },
                {
                  link: '/geonodes',
                  title: 'geonodes',
                },
                {
                  link: '/vouchers',
                  title: 'vouchers',
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
