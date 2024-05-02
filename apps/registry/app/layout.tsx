import { HeaderWallet as Header, UserSidebar } from 'chora/components'
import {
  AccountContextProvider,
  MenuContextProvider,
  ServerContextProvider,
  ThemeContextProvider,
  WalletContextProvider,
} from 'chora/contexts'

import Sidebar from '@components/Sidebar'

import './globals.css'

const Layout = ({ children }: any) => (
  <html lang="en">
    <body>
      <ThemeContextProvider>
        <MenuContextProvider>
          <WalletContextProvider>
            <AccountContextProvider>
              <ServerContextProvider>
                <Header
                  title={{
                    link: '/',
                    titleX: 'registry',
                  }}
                  showMenuButton={true}
                  showUserButton={true}
                />
                <Sidebar />
                <UserSidebar />
                <main>{children}</main>
              </ServerContextProvider>
            </AccountContextProvider>
          </WalletContextProvider>
        </MenuContextProvider>
      </ThemeContextProvider>
    </body>
  </html>
)

export default Layout
