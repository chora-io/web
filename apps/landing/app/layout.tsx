import { Background, Footer, Header, Sidebar } from 'chora/components'
import { MenuContextProvider, ThemeContextProvider } from 'chora/contexts'
import Link from 'next/link'

import './globals.css'

const Layout = ({ children }: any) => (
  <html lang="en">
    <body>
      <main>
        <ThemeContextProvider>
          <MenuContextProvider>
            <Background />
            <Header
              title={{
                link: '/',
                titleX: '',
              }}
              itemsLeft={[
                {
                  link: 'chora-groups',
                  target: '',
                  title: 'groups',
                },
                {
                  link: 'chora-registry',
                  target: '',
                  title: 'registry',
                },
                {
                  link: 'chora-ledger',
                  target: '',
                  title: 'ledger',
                },
              ]}
              itemsRight={[
                {
                  link: 'https://docs.chora.io',
                  target: '_blank',
                  title: 'docs',
                },
              ]}
              showMenuButton={true}
            />
            <Sidebar
              items={[
                {
                  link: '.',
                  target: '',
                  title: 'home',
                },
                {
                  link: 'chora-groups',
                  target: '',
                  title: 'groups',
                },
                {
                  link: 'chora-registry',
                  target: '',
                  title: 'registry',
                },
                {
                  link: 'chora-ledger',
                  target: '',
                  title: 'ledger',
                },
                'divider',
                {
                  link: 'https://docs.chora.io/guides',
                  target: '_blank',
                  title: 'user guides',
                },
                {
                  link: 'https://docs.chora.io/specs',
                  target: '_blank',
                  title: 'specifications',
                },
                {
                  link: 'https://github.com/chora-io',
                  target: '_blank',
                  title: 'source code',
                },
                'divider',
                {
                  link: 'https://chora.studio',
                  target: '_blank',
                  title: 'chora studio',
                },
              ]}
              mobile={true}
            />
            {children}
            <Footer
              about={{
                title: 'about',
                text: (
                  <p>
                    {'Chora is open-source software stewarded by '}
                    <Link href="https://chora.studio" target="_blank">
                      {'Chora Studio'}
                    </Link>
                    {'.'}
                  </p>
                ),
              }}
              items={[
                {
                  title: 'applications',
                  items: [
                    {
                      link: '/chora-groups',
                      target: '',
                      title: 'groups',
                    },
                    {
                      link: '/chora-registry',
                      target: '',
                      title: 'registry',
                    },
                    {
                      link: '/chora-ledger',
                      target: '',
                      title: 'ledger',
                    },
                  ],
                },
                {
                  title: 'resources',
                  items: [
                    {
                      link: 'https://docs.chora.io/guides',
                      target: '_blank',
                      title: 'user guides',
                    },
                    {
                      link: 'https://docs.chora.io/specs',
                      target: '_blank',
                      title: 'specifications',
                    },
                    {
                      link: 'https://github.com/chora-io',
                      target: '_blank',
                      title: 'source code',
                    },
                  ],
                },
              ]}
            />
          </MenuContextProvider>
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
