import { HeaderWallet as Header, Sidebar } from 'chora/components'
import {
  ServerContextProvider,
  ThemeContextProvider,
  WalletContextProvider,
} from 'chora/contexts'

import './globals.css'

const Layout = ({ children }: any) => (
  <html lang="en">
    <body>
      <main>
        <ThemeContextProvider>
          <WalletContextProvider>
            <ServerContextProvider>
              <Header
                title={{
                  link: '/',
                  titleX: 'user',
                }}
              />
              <Sidebar
                items={[
                  {
                    link: '/account',
                    title: 'account',
                  },
                ]}
              />
              {children}
            </ServerContextProvider>
          </WalletContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
