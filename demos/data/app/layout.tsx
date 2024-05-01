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
      <main>
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
              {children}
            </WalletContextProvider>
          </MenuContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
