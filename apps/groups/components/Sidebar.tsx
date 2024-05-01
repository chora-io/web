'use client'

import { MenuContext, WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

import styles from './Sidebar.module.css'

const Sidebar = () => {
  const { groupId } = useParams()
  const currentRoute = usePathname()
  const { showMenu, setShowMenu } = useContext(MenuContext)
  const { network } = useContext(WalletContext)

  const [initRoute, setInitRoute] = useState<string>('')

  // whether component has mounted
  const [hasMounted, setHasMounted] = useState(false)

  // handle hydration
  useEffect(() => {
    setHasMounted(true)
  }, [])

  // requires hydration
  const desktop = hasMounted && !window.matchMedia('(max-width: 850px)').matches

  useEffect(() => {
    if (currentRoute && !initRoute) {
      setInitRoute(currentRoute)
    }
    if (initRoute && initRoute !== currentRoute) {
      setInitRoute(currentRoute)
      setShowMenu(false)
    }
  }, [currentRoute, initRoute, setShowMenu])

  if (groupId) {
    return hasMounted && (desktop || showMenu) ? (
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
          <li>{'manage'}</li>
          {!!network && network.includes('chora') && (
            <ul>
              <li>
                <Link
                  href={`/${network}/${groupId}/claims`}
                  className={
                    currentRoute === `/${network}/${groupId}/claims`
                      ? styles.active
                      : undefined
                  }
                >
                  {'claims'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${network}/${groupId}/subjects`}
                  className={
                    currentRoute === `/${network}/${groupId}/subjects`
                      ? styles.active
                      : undefined
                  }
                >
                  {'subjects'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${network}/${groupId}/monitors`}
                  className={
                    currentRoute === `/${network}/${groupId}/monitors`
                      ? styles.active
                      : undefined
                  }
                >
                  {'monitors'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${network}/${groupId}/verifiers`}
                  className={
                    currentRoute === `/${network}/${groupId}/verifiers`
                      ? styles.active
                      : undefined
                  }
                >
                  {'verifiers'}
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
          )}
          {!!network && network.includes('regen') && (
            <ul>
              <li>
                <Link
                  href={`/${network}/${groupId}/claims`}
                  className={
                    currentRoute === `/${network}/${groupId}/claims`
                      ? styles.active
                      : undefined
                  }
                >
                  {'claims'}
                </Link>
              </li>
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
              <li>
                <Link
                  href={`/${network}/${groupId}/batches`}
                  className={
                    currentRoute === `/${network}/${groupId}/batches`
                      ? styles.active
                      : undefined
                  }
                >
                  {'batches'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${network}/${groupId}/baskets`}
                  className={
                    currentRoute === `/${network}/${groupId}/baskets`
                      ? styles.active
                      : undefined
                  }
                >
                  {'baskets'}
                </Link>
              </li>
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
          )}
        </ul>
      </div>
    ) : (
      <></>
    )
  }

  return hasMounted && (desktop || showMenu) ? (
    <div className={styles.sidebar}>
      <ul>
        {currentRoute !== '/' && (
          <ul className={styles.mobile}>
            <li style={{ padding: '1em 0' }}>
              <Link
                href={'/'}
                className={currentRoute === '/' ? styles.active : undefined}
              >
                {'← home'}
              </Link>
            </li>
          </ul>
        )}
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
        </ul>
      </ul>
    </div>
  ) : (
    <></>
  )
}

export default Sidebar
