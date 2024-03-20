'use client'

import { AuthContext, WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'

import styles from './Sidebar.module.css'

const Sidebar = () => {
  const { network } = useContext(WalletContext)

  const { activeAccount } = useContext(AuthContext)

  const currentRoute = usePathname()

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>{'explore'}</li>
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
          {activeAccount && (
            <>
              <li>
                <Link
                  href="/workspace/workflows"
                  className={
                    currentRoute === '/workspace/workflows'
                      ? styles.active
                      : undefined
                  }
                >
                  {'workflows'}
                </Link>
              </li>
              <li>
                <Link
                  href="/workspace/documents"
                  className={
                    currentRoute === '/workspace/documents'
                      ? styles.active
                      : undefined
                  }
                >
                  {'documents'}
                </Link>
              </li>
            </>
          )}
        </ul>
      </ul>
    </div>
  )
}

export default Sidebar
