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
          <Header
            title={{
              link: '/',
              titleX: 'intents',
            }}
          />
          <Sidebar
            items={[
              {
                link: '/',
                title: 'home',
              },
              {
                link: '/intents',
                title: 'intents',
              },
            ]}
          />
          <main>{children}</main>
        </MenuContextProvider>
      </ThemeContextProvider>
    </body>
  </html>
)

export default Layout
