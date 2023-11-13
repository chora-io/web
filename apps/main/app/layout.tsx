import { Footer, Header } from 'chora/components'
import { ThemeContextProvider } from 'chora/contexts'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'
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
                link: PHASE_DEVELOPMENT_SERVER
                  ? 'http://localhost:8001'
                  : '/coop',
                title: 'coop',
              },
              {
                link: PHASE_DEVELOPMENT_SERVER
                  ? 'http://localhost:8002'
                  : '/data',
                title: 'data',
              },
              {
                link: PHASE_DEVELOPMENT_SERVER
                  ? 'http://localhost:8003'
                  : '/mods',
                title: 'mods',
              },
              {
                link: PHASE_DEVELOPMENT_SERVER
                  ? 'http://localhost:8004'
                  : '/scan',
                title: 'scan',
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
                  {'Chora is open-source software managed by '}
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
                    link: PHASE_DEVELOPMENT_SERVER
                      ? 'http://localhost:8001'
                      : '/coop',
                    target: '',
                    title: 'chora cooperative',
                  },
                  {
                    link: PHASE_DEVELOPMENT_SERVER
                      ? 'http://localhost:8002'
                      : '/data',
                    target: '',
                    title: 'data management',
                  },
                  {
                    link: PHASE_DEVELOPMENT_SERVER
                      ? 'http://localhost:8003'
                      : '/mods',
                    target: '',
                    title: 'blockchain modules',
                  },
                  {
                    link: PHASE_DEVELOPMENT_SERVER
                      ? 'http://localhost:8004'
                      : '/scan',
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
