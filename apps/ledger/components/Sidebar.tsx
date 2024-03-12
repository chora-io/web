'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'

import styles from './Sidebar.module.css'

const Sidebar = () => {
  const { network } = useContext(WalletContext)

  const currentRoute = usePathname()

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>{'account'}</li>
        <ul>
          <li>
            <Link
              href="/account"
              className={
                currentRoute === '/account' ? styles.active : undefined
              }
            >
              {'overview'}
            </Link>
          </li>
        </ul>
        <li>{'network'}</li>
        <ul>
          <li>
            <Link
              href="/network"
              className={
                currentRoute === '/network' ? styles.active : undefined
              }
            >
              {'overview'}
            </Link>
          </li>
        </ul>
        <li>{'modules'}</li>
        {!!network && network.includes('chora') && (
          <ul>
            <li>
              <Link
                href="/modules/authz"
                className={
                  currentRoute === '/modules/authz' ? styles.active : undefined
                }
              >
                {'authz'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/bank"
                className={
                  currentRoute === '/modules/bank' ? styles.active : undefined
                }
              >
                {'bank'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/data"
                className={
                  currentRoute === '/modules/data' ? styles.active : undefined
                }
              >
                {'data'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/feegrant"
                className={
                  currentRoute === '/modules/feegrant'
                    ? styles.active
                    : undefined
                }
              >
                {'feegrant'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/geonode"
                className={
                  currentRoute === '/modules/geonode'
                    ? styles.active
                    : undefined
                }
              >
                {'geonode'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/group"
                className={
                  currentRoute === '/modules/group' ? styles.active : undefined
                }
              >
                {'group'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/intertx"
                className={
                  currentRoute === '/modules/intertx'
                    ? styles.active
                    : undefined
                }
              >
                {'intertx'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/voucher"
                className={
                  currentRoute === '/modules/voucher'
                    ? styles.active
                    : undefined
                }
              >
                {'voucher'}
              </Link>
            </li>
          </ul>
        )}
        {!!network && network.includes('regen') && (
          <ul>
            <li>
              <Link
                href="/modules/authz"
                className={
                  currentRoute === '/modules/authz' ? styles.active : undefined
                }
              >
                {'authz'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/bank"
                className={
                  currentRoute === '/modules/bank' ? styles.active : undefined
                }
              >
                {'bank'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/data"
                className={
                  currentRoute === '/modules/data' ? styles.active : undefined
                }
              >
                {'data'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/ecocredit"
                className={
                  currentRoute === '/modules/ecocredit'
                    ? styles.active
                    : undefined
                }
              >
                {'ecocredit'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/feegrant"
                className={
                  currentRoute === '/modules/feegrant'
                    ? styles.active
                    : undefined
                }
              >
                {'feegrant'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/group"
                className={
                  currentRoute === '/modules/group' ? styles.active : undefined
                }
              >
                {'group'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/intertx"
                className={
                  currentRoute === '/modules/intertx'
                    ? styles.active
                    : undefined
                }
              >
                {'intertx'}
              </Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
