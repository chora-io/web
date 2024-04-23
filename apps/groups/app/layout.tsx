import { HeaderWallet as Header, UserSidebar } from 'chora/components'
import {
  AuthContextProvider,
  ThemeContextProvider,
  UserContextProvider,
  WalletContextProvider,
} from 'chora/contexts'

import Sidebar from '@components/Sidebar'
import { AuthzContextProvider } from '@contexts/AuthzContext'

import './globals.css'

const Layout = ({ children }: any) => (
  <html lang="en">
    <body>
      <main>
        <ThemeContextProvider>
          <WalletContextProvider>
            <AuthContextProvider>
              <UserContextProvider>
                <AuthzContextProvider>
                  <Header
                    title={{
                      link: '/',
                      titleX: 'groups',
                    }}
                  />
                  <Sidebar />
                  <UserSidebar />
                  {children}
                </AuthzContextProvider>
              </UserContextProvider>
            </AuthContextProvider>
          </WalletContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
