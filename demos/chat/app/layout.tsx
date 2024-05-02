import { Header, Sidebar } from 'chora/components'
import { MenuContextProvider, ThemeContextProvider } from 'chora/contexts'

import './globals.css'

const Layout = ({ children }: any) => (
  <html lang="en">
    <body>
      <ThemeContextProvider>
        <MenuContextProvider>
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
          <main>{children}</main>
        </MenuContextProvider>
      </ThemeContextProvider>
    </body>
  </html>
)

export default Layout
