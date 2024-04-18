'use client'

import { AuthContext, WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useContext } from 'react'

import styles from './Sidebar.module.css'

const Sidebar = () => {
  const { groupId } = useParams()
  const currentRoute = usePathname()
  const { account } = useContext(AuthContext)
  const { network } = useContext(WalletContext)

  if (groupId) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li style={{ padding: '1em 0' }}>
              <Link
                href={`/${network}`}
                className={
                  currentRoute === `/${network}` ? styles.active : undefined
                }
              >
                {'← groups'}
              </Link>
            </li>
          </ul>
          <li>{'group'}</li>
          <ul>
            <li>
              <Link
                href={`/${network}/${groupId}`}
                className={
                  currentRoute === `/${network}/${groupId}`
                    ? styles.active
                    : undefined
                }
              >
                {'overview'}
              </Link>
            </li>
            <li>
              <Link
                href={`/${network}/${groupId}/accounts`}
                className={
                  currentRoute === `/${network}/${groupId}/accounts`
                    ? styles.active
                    : undefined
                }
              >
                {'accounts'}
              </Link>
            </li>
            <li>
              <Link
                href={`/${network}/${groupId}/members`}
                className={
                  currentRoute === `/${network}/${groupId}/members`
                    ? styles.active
                    : undefined
                }
              >
                {'members'}
              </Link>
            </li>
            <li>
              <Link
                href={`/${network}/${groupId}/proposals`}
                className={
                  currentRoute === `/${network}/${groupId}/proposals`
                    ? styles.active
                    : undefined
                }
              >
                {'proposals'}
              </Link>
            </li>
          </ul>
          <li>{'extended'}</li>
          {!!network && network.includes('chora') && (
            <ul>
              <li>
                <Link
                  href={`/${network}/${groupId}/geonodes`}
                  className={
                    currentRoute === `/${network}/${groupId}/geonodes`
                      ? styles.active
                      : undefined
                  }
                >
                  {'geonodes'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${network}/${groupId}/vouchers`}
                  className={
                    currentRoute === `/${network}/${groupId}/vouchers`
                      ? styles.active
                      : undefined
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
                  href={`/${network}/${groupId}/classes`}
                  className={
                    currentRoute === `/${network}/${groupId}/classes`
                      ? styles.active
                      : undefined
                  }
                >
                  {'classes'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${network}/${groupId}/projects`}
                  className={
                    currentRoute === `/${network}/${groupId}/projects`
                      ? styles.active
                      : undefined
                  }
                >
                  {'projects'}
                </Link>
              </li>
            </ul>
          )}
          <ul>
            <li>
              <Link
                href={`/${network}/${groupId}/resolvers`}
                className={
                  currentRoute === `/${network}/${groupId}/resolvers`
                    ? styles.active
                    : undefined
                }
              >
                {'resolvers'}
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    )
  }

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>{'explore'}</li>
        <ul>
          <li>
            <Link
              href={`/${network}`}
              className={
                currentRoute === `/${network}` ? styles.active : undefined
              }
            >
              {'groups'}
            </Link>
          </li>
        </ul>
        <li>{'workspace'}</li>
        <ul>
          <li>
            <Link
              href="/workspace"
              className={
                currentRoute === '/workspace' ? styles.active : undefined
              }
            >
              {'dashboard'}
            </Link>
          </li>
          {account && (
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
