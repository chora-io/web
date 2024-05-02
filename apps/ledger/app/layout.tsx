import { HeaderWallet as Header } from 'chora/components'
import {
  AccountContextProvider,
  MenuContextProvider,
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
              <Header
                title={{
                  link: '/',
                  titleX: 'ledger',
                }}
                showMenuButton={true}
              />
              <Sidebar />
              <main>{children}</main>
            </AccountContextProvider>
          </WalletContextProvider>
        </MenuContextProvider>
      </ThemeContextProvider>
    </body>
  </html>
)

export default Layout
