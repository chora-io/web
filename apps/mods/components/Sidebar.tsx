'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'

import styles from './Sidebar.module.css'

const Sidebar = () => {
  const { network } = useContext(WalletContext)

  const currentRoute = usePathname()

  if (!!network && network.includes('chora')) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <li>
            <Link
              href="/"
              className={currentRoute === '/' ? styles.active : undefined}
            >
              {'home'}
            </Link>
          </li>
          <li>
            <Link
              href="/authz"
              className={currentRoute === '/authz' ? styles.active : undefined}
            >
              {'authz'}
            </Link>
          </li>
          <li>
            <Link
              href="/bank"
              className={currentRoute === '/bank' ? styles.active : undefined}
            >
              {'bank'}
            </Link>
          </li>
          <li>
            <Link
              href="/data"
              className={currentRoute === '/data' ? styles.active : undefined}
            >
              {'data'}
            </Link>
          </li>
          <li>
            <Link
              href="/feegrant"
              className={
                currentRoute === '/feegrant' ? styles.active : undefined
              }
            >
              {'feegrant'}
            </Link>
          </li>
          <li>
            <Link
              href="/geonode"
              className={
                currentRoute === '/geonode' ? styles.active : undefined
              }
            >
              {'geonode'}
            </Link>
          </li>
          <li>
            <Link
              href="/group"
              className={currentRoute === '/group' ? styles.active : undefined}
            >
              {'group'}
            </Link>
          </li>
          <li>
            <Link
              href="/intertx"
              className={
                currentRoute === '/intertx' ? styles.active : undefined
              }
            >
              {'intertx'}
            </Link>
          </li>
          <li>
            <Link
              href="/voucher"
              className={
                currentRoute === '/voucher' ? styles.active : undefined
              }
            >
              {'voucher'}
            </Link>
          </li>
        </ul>
      </div>
    )
  }

  if (!!network && network.includes('regen')) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <li>
            <Link
              href="/"
              className={currentRoute === '/' ? styles.active : undefined}
            >
              {'home'}
            </Link>
          </li>
          <li>
            <Link
              href="/authz"
              className={currentRoute === '/authz' ? styles.active : undefined}
            >
              {'authz'}
            </Link>
          </li>
          <li>
            <Link
              href="/bank"
              className={currentRoute === '/bank' ? styles.active : undefined}
            >
              {'bank'}
            </Link>
          </li>
          <li>
            <Link
              href="/data"
              className={currentRoute === '/data' ? styles.active : undefined}
            >
              {'data'}
            </Link>
          </li>
          <li>
            <Link
              href="/ecocredit"
              className={
                currentRoute === '/ecocredit' ? styles.active : undefined
              }
            >
              {'ecocredit'}
            </Link>
          </li>
          <li>
            <Link
              href="/feegrant"
              className={
                currentRoute === '/feegrant' ? styles.active : undefined
              }
            >
              {'feegrant'}
            </Link>
          </li>
          <li>
            <Link
              href="/group"
              className={currentRoute === '/group' ? styles.active : undefined}
            >
              {'group'}
            </Link>
          </li>
          <li>
            <Link
              href="/intertx"
              className={
                currentRoute === '/intertx' ? styles.active : undefined
              }
            >
              {'intertx'}
            </Link>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <Link
            href="/"
            className={currentRoute === '' ? styles.active : undefined}
          >
            {'home'}
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
