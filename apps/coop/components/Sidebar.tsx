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
        <li>{'groups'}</li>
        <ul>
          <li>
            <Link
              href="/groups"
              className={currentRoute === '/groups' ? styles.active : undefined}
            >
              {'explore'}
            </Link>
          </li>
        </ul>
        <li>{'chora coop'}</li>
        <ul>
          <li>
            <Link
              href="/group"
              className={currentRoute === '/group' ? styles.active : undefined}
            >
              {'overview'}
            </Link>
          </li>
          <li>
            <Link
              href="/group/accounts"
              className={
                currentRoute === '/group/accounts' ? styles.active : undefined
              }
            >
              {'accounts'}
            </Link>
          </li>
          <li>
            <Link
              href="/group/members"
              className={
                currentRoute === '/group/members' ? styles.active : undefined
              }
            >
              {'members'}
            </Link>
          </li>
          <li>
            <Link
              href="/group/proposals"
              className={
                currentRoute === '/group/proposals' ? styles.active : undefined
              }
            >
              {'proposals'}
            </Link>
          </li>
        </ul>
        {!!network && network.includes('chora') && (
          <ul>
            <li>
              <Link
                href="/group/geonodes"
                className={
                  currentRoute === '/group/geonodes' ? styles.active : undefined
                }
              >
                {'geonodes'}
              </Link>
            </li>
            <li>
              <Link
                href="/group/vouchers"
                className={
                  currentRoute === '/group/vouchers' ? styles.active : undefined
                }
              >
                {'vouchers'}
              </Link>
            </li>
          </ul>
        )}
        {!!network && network.includes('regen') && (
          <ul>
            <li>
              <Link
                href="/group/ecocredits"
                className={
                  currentRoute === '/group/ecocredits'
                    ? styles.active
                    : undefined
                }
              >
                {'ecocredits'}
              </Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
