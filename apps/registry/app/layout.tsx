import { HeaderWallet as Header, UserSidebar } from 'chora/components'
import {
  AuthContextProvider,
  ThemeContextProvider,
  UserContextProvider,
  WalletContextProvider,
} from 'chora/contexts'

import Sidebar from '@components/Sidebar'

import './globals.css'

const Layout = ({ children }: any) => (
  <html lang="en">
    <body>
      <main>
        <ThemeContextProvider>
          <WalletContextProvider>
            <AuthContextProvider>
              <UserContextProvider>
                <Header
                  title={{
                    link: '/',
                    titleX: 'registry',
                  }}
                />
                <Sidebar />
                <UserSidebar />
                {children}
              </UserContextProvider>
            </AuthContextProvider>
          </WalletContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
