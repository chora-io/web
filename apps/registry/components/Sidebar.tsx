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
        <li>{'workflow'}</li>
        <ul>
          <li>
            <Link
              href="/workflow"
              className={
                currentRoute === '/workflow' ? styles.active : undefined
              }
            >
              {'dashboard'}
            </Link>
          </li>
        </ul>
        <li>{'services'}</li>
        <ul>
          <li>
            <Link
              href="/services/data"
              className={
                currentRoute === '/services/data' ? styles.active : undefined
              }
            >
              {'data service'}
            </Link>
          </li>
        </ul>
      </ul>
    </div>
  )
}

export default Sidebar
