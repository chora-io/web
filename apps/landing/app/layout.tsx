import { Background, Footer, Header } from 'chora/components'
import { ThemeContextProvider } from 'chora/contexts'
import Link from 'next/link'

import './globals.css'

const Layout = ({ children }: any) => (
  <html lang="en">
    <body>
      <main>
        <ThemeContextProvider>
          <Background />
          <Header
            title={{
              link: '/',
              titleX: '',
            }}
            itemsLeft={[
              {
                link: 'chora-groups',
                title: 'groups',
              },
              {
                link: 'chora-registry',
                title: 'registry',
              },
              {
                link: 'chora-ledger',
                title: 'ledger',
              },
            ]}
            itemsRight={[
              {
                link: 'https://docs.chora.io',
                title: 'docs ↗',
              },
            ]}
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
                    title: 'user guides ↗',
                  },
                  {
                    link: 'https://docs.chora.io/specs',
                    target: '_blank',
                    title: 'specifications ↗',
                  },
                  {
                    link: 'https://github.com/chora-io',
                    target: '_blank',
                    title: 'source code ↗',
                  },
                ],
              },
            ]}
          />
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
