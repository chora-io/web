import {
  AuthContextProvider,
  ThemeContextProvider,
  WalletContextProvider,
} from 'chora/contexts'
import { Header } from 'chora/components'

import Sidebar from '@components/Sidebar'

import './globals.css'

const Layout = ({ children }: any) => (
  <html lang="en">
    <body>
      <main>
        <ThemeContextProvider>
          <WalletContextProvider>
            <AuthContextProvider>
              <Header />
              <Sidebar />
              {children}
            </AuthContextProvider>
          </WalletContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
