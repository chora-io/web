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
        <li>{'registry'}</li>
        {!!network && network.includes('chora') && (
          <ul>
            <li>
              <Link
                href="/geonodes"
                className={
                  currentRoute === '/geonodes' ? styles.active : undefined
                }
              >
                {'geonodes'}
              </Link>
            </li>
          </ul>
        )}
        {!!network && network.includes('regen') && (
          <ul>
            <li>
              <Link
                href="/credits"
                className={
                  currentRoute === '/credits' ? styles.active : undefined
                }
              >
                {'credits'}
              </Link>
            </li>
            <li>
              <Link
                href="/classes"
                className={
                  currentRoute === '/classes' ? styles.active : undefined
                }
              >
                {'classes'}
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className={
                  currentRoute === '/projects' ? styles.active : undefined
                }
              >
                {'projects'}
              </Link>
            </li>
          </ul>
        )}
        <li>{'workspace'}</li>
        <ul>
          <li>
            <Link
              href="/workspace"
              className={
                currentRoute === '/workspace' ? styles.active : undefined
              }
            >
              {'overview'}
            </Link>
          </li>
        </ul>
      </ul>
    </div>
  )
}

export default Sidebar
