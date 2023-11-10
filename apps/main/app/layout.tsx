import { Footer, Header } from 'chora/components'
import { ThemeContextProvider } from 'chora/contexts'
import Link from 'next/link'

import './globals.css'

const Layout = ({ children }: any) => (
  <html lang="en">
    <body>
      <main>
        <ThemeContextProvider>
          <Header
            title={{
              link: '/',
              titleX: '',
            }}
            itemsLeft={[
              {
                link: '/coop',
                title: 'coop',
              },
              {
                link: '/data',
                title: 'data',
              },
              {
                link: '/mods',
                title: 'mods',
              },
              {
                link: '/scan',
                title: 'scan',
              },
            ]}
            itemsRight={[
              {
                link: 'https://docs.chora.io',
                title: 'docs',
              },
            ]}
          />
          {children}
          <Footer
            about={{
              title: 'about',
              paragraph: (
                <p>
                  {'Chora Protocol is an initiative led by '}
                  <Link href="https://chora.studio" target="_blank">
                    {'Chora Studio'}
                  </Link>
                  {'.'}
                </p>
              ),
            }}
            items={[
              {
                title: 'app (beta)',
                items: [
                  {
                    link: '/coop',
                    target: '',
                    title: 'chora cooperative',
                  },
                  {
                    link: '/data',
                    target: '',
                    title: 'data management',
                  },
                  {
                    link: '/mods',
                    target: '',
                    title: 'blockchain modules',
                  },
                  {
                    link: '/scan',
                    target: '',
                    title: 'network scanner',
                  },
                ],
              },
              {
                title: 'resources',
                items: [
                  {
                    link: 'https://chora.notion.site/chora-light-paper-8fe227be3e514ab69270087593ec2d83',
                    target: '_blank',
                    title: 'light paper ↗',
                  },
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
