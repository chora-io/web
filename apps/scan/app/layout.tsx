import { ThemeContextProvider, WalletContextProvider } from 'chora/contexts'

import Header from '@components/Header'

import './globals.css'

const Layout = ({ children }: any) => (
  <html lang="en">
    <body>
      <main>
        <ThemeContextProvider>
          <WalletContextProvider>
            <Header
              title={{
                link:
                  process.env.NODE_ENV === 'development'
                    ? 'http://localhost:8000'
                    : 'https://chora.io',
                titleX: '',
              }}
            />
            {children}
          </WalletContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
