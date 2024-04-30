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
      <main>
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
                {children}
              </AccountContextProvider>
            </WalletContextProvider>
          </MenuContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
