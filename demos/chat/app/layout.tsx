import { Header, Sidebar } from 'chora/components'
import { MenuContextProvider, ThemeContextProvider } from 'chora/contexts'

import './globals.css'

const Layout = ({ children }: any) => (
  <html lang="en">
    <body>
      <main>
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
            {children}
          </MenuContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
