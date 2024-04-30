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
      <main>
        <ThemeContextProvider>
          <MenuContextProvider>
            <WalletContextProvider>
              <Header
                title={{
                  link: '/',
                  titleX: 'faucet',
                }}
                showMenuButton={true}
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
              {children}
            </WalletContextProvider>
          </MenuContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
