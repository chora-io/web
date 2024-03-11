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
        <li>{'assets'}</li>
        <ul>
          <li>
            <Link
              href="/assets"
              className={currentRoute === '/assets' ? styles.active : undefined}
            >
              {'explore'}
            </Link>
          </li>
          {!!network && network.includes('regen') && (
            <li>
              <Link
                href="/assets/manage"
                className={
                  currentRoute === '/assets/manage' ? styles.active : undefined
                }
              >
                {'manage'}
              </Link>
            </li>
          )}
        </ul>
        <li>{'claims'}</li>
        <ul>
          <li>
            <Link
              href="/claims"
              className={currentRoute === '/claims' ? styles.active : undefined}
            >
              {'explore'}
            </Link>
          </li>
          <li>
            <Link
              href="/claims/manage"
              className={
                currentRoute === '/claims/manage' ? styles.active : undefined
              }
            >
              {'manage'}
            </Link>
          </li>
        </ul>
      </ul>
    </div>
  )
}

export default Sidebar
