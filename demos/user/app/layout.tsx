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
              <main>{children}</main>
            </ServerContextProvider>
          </WalletContextProvider>
        </MenuContextProvider>
      </ThemeContextProvider>
    </body>
  </html>
)

export default Layout
