import { HeaderWallet as Header, Sidebar } from 'chora/components'
import {
  MenuContextProvider,
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
            <Header
              title={{
                link: '/',
                titleX: 'data',
              }}
            />
            <Sidebar
              items={[
                {
                  link: '/',
                  title: 'home',
                },
                {
                  link: '/convert',
                  title: 'convert',
                },
                {
                  link: '/resolvers',
                  title: 'resolvers',
                },
                {
                  link: '/server',
                  title: 'server',
                },
              ]}
            />
            <main>{children}</main>
          </WalletContextProvider>
        </MenuContextProvider>
      </ThemeContextProvider>
    </body>
  </html>
)

export default Layout
