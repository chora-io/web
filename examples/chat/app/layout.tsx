import { Header, Sidebar } from 'chora/components'
import { ThemeContextProvider } from 'chora/contexts'

import './globals.css'

const Layout = ({ children }: any) => (
  <html lang="en">
    <body>
      <main>
        <ThemeContextProvider>
          <Header
            title={{
              link: 'https://chora.io',
              titleX: '',
            }}
          />
          <Sidebar
            items={[
              {
                link: '/',
                title: 'home',
              },
              {
                link: '/completion',
                title: 'completion',
              },
            ]}
          />
          {children}
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
