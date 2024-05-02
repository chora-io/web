import { HeaderWallet as Header } from 'chora/components'
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
                titleX: 'base',
              }}
            />
            <main>{children}</main>
          </WalletContextProvider>
        </MenuContextProvider>
      </ThemeContextProvider>
    </body>
  </html>
)

export default Layout
