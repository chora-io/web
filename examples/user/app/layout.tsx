import { HeaderWallet as Header, Sidebar } from 'chora/components'
import {
  AuthContextProvider,
  ThemeContextProvider,
  WalletContextProvider,
} from 'chora/contexts'

import './globals.css'

const Layout = ({ children }: any) => (
  <html lang="en">
    <body>
      <main>
        <ThemeContextProvider>
          <WalletContextProvider>
            <AuthContextProvider>
              <Header />
              <Sidebar
                items={[
                  {
                    link: '/',
                    title: 'home',
                  },
                  {
                    link: '/account',
                    title: 'account',
                  },
                ]}
              />
              {children}
            </AuthContextProvider>
          </WalletContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
