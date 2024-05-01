import { HeaderWallet as Header, Sidebar } from 'chora/components'
import {
  MenuContextProvider,
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
          <MenuContextProvider>
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
          </MenuContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
