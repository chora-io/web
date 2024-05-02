import { Header, Sidebar } from 'chora/components'
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
                titleX: 'faucet',
              }}
              showMenuButton={true}
              showMobileTitle={true}
            />
            <Sidebar
              items={[
                {
                  link: 'chora-testnet-1',
                  target: '',
                  title: 'Chora Testnet',
                },
                {
                  link: 'regen-redwood-1',
                  target: '',
                  title: 'Regen Redwood',
                },
              ]}
              mobile={true}
            />
            <main>{children}</main>
          </WalletContextProvider>
        </MenuContextProvider>
      </ThemeContextProvider>
    </body>
  </html>
)

export default Layout
