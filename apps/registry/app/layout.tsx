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
      <main>
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
                  {children}
                </ServerContextProvider>
              </AccountContextProvider>
            </WalletContextProvider>
          </MenuContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
