import { ThemeContextProvider } from 'chora/contexts'

import Footer from '@components/Footer'
import Header from '@components/Header'

import './globals.css'

const Layout = ({ children }: any) => (
  <html lang="en">
    <body>
      <main>
        <ThemeContextProvider>
          <Header />
          {children}
          <Footer />
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
