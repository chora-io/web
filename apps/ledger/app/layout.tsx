import { HeaderWallet as Header } from 'chora/components'
import {
  AccountContextProvider,
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
          <WalletContextProvider>
            <AccountContextProvider>
              <Header
                title={{
                  link: '/',
                  titleX: 'ledger',
                }}
                noUser={true}
              />
              <Sidebar />
              {children}
            </AccountContextProvider>
          </WalletContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
