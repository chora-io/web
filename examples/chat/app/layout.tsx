import { Header } from 'chora/components'
import { ThemeContextProvider, WalletContextProvider } from 'chora/contexts'

import Sidebar from '@components/Sidebar'

import './globals.css'

const Layout = ({ children }: any) => (
  <html lang="en">
    <body>
      <main>
        <ThemeContextProvider>
          <WalletContextProvider>
            <Header />
            <Sidebar />
            {children}
          </WalletContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
