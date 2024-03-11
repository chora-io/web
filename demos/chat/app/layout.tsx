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
              link: '/',
              titleX: 'chat',
            }}
          />
          <Sidebar
            items={[
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
