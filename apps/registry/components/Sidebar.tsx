'use client'

import { ArrowLeft } from 'chora/components/icons'
import { MenuContext, WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

import styles from './Sidebar.module.css'

const Sidebar = () => {
  const { denom, id, iri } = useParams()
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

  if (currentRoute.includes('claims') && iri) {
    return hasMounted && (desktop || showMenu) ? (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li className={styles.breadcrumb}>
              <Link
                href={`/${network}/claims`}
                className={
                  currentRoute === `/${network}/claims`
                    ? styles.active
                    : undefined
                }
              >
                <ArrowLeft />
                {'claims'}
              </Link>
            </li>
          </ul>
          <li>{'data claim'}</li>
          <ul>
            <li>
              <Link
                href={`/${network}/claims/${iri}`}
                className={
                  currentRoute === `/${network}/claims/${iri}`
                    ? styles.active
                    : undefined
                }
              >
                {'overview'}
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    ) : (
      <></>
    )
  }

  if (currentRoute.includes('classes') && id) {
    return hasMounted && (desktop || showMenu) ? (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li className={styles.breadcrumb}>
              <Link
                href={`/${network}/classes`}
                className={
                  currentRoute === `/${network}/classes`
                    ? styles.active
                    : undefined
                }
              >
                <ArrowLeft />
                {'classes'}
              </Link>
            </li>
          </ul>
          <li>{'credit class'}</li>
          <ul>
            <li>
              <Link
                href={`/${network}/classes/${id}`}
                className={
                  currentRoute === `/${network}/classes/${id}`
                    ? styles.active
                    : undefined
                }
              >
                {'overview'}
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    ) : (
      <></>
    )
  }

  if (currentRoute.includes('batches') && denom) {
    return hasMounted && (desktop || showMenu) ? (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li className={styles.breadcrumb}>
              <Link
                href={`/${network}/batches`}
                className={
                  currentRoute === `/${network}/batches`
                    ? styles.active
                    : undefined
                }
              >
                <ArrowLeft />
                {'batches'}
              </Link>
            </li>
          </ul>
          <li>{'credit batch'}</li>
          <ul>
            <li>
              <Link
                href={`/${network}/batches/${denom}`}
                className={
                  currentRoute === `/${network}/batches/${denom}`
                    ? styles.active
                    : undefined
                }
              >
                {'overview'}
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    ) : (
      <></>
    )
  }

  if (currentRoute.includes('baskets') && denom) {
    return hasMounted && (desktop || showMenu) ? (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li className={styles.breadcrumb}>
              <Link
                href={`/${network}/baskets`}
                className={
                  currentRoute === `/${network}/baskets`
                    ? styles.active
                    : undefined
                }
              >
                <ArrowLeft />
                {'baskets'}
              </Link>
            </li>
          </ul>
          <li>{'credit basket'}</li>
          <ul>
            <li>
              <Link
                href={`/${network}/baskets/${denom}`}
                className={
                  currentRoute === `/${network}/baskets/${denom}`
                    ? styles.active
                    : undefined
                }
              >
                {'overview'}
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    ) : (
      <></>
    )
  }

  if (currentRoute.includes('monitors') && id) {
    return hasMounted && (desktop || showMenu) ? (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li className={styles.breadcrumb}>
              <Link
                href={`/${network}/monitors`}
                className={
                  currentRoute === `/${network}/monitors`
                    ? styles.active
                    : undefined
                }
              >
                <ArrowLeft />
                {'monitors'}
              </Link>
            </li>
          </ul>
          <li>{'monitor'}</li>
          <ul>
            <li>
              <Link
                href={`/${network}/monitors/${id}`}
                className={
                  currentRoute === `/${network}/monitors/${id}`
                    ? styles.active
                    : undefined
                }
              >
                {'overview'}
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    ) : (
      <></>
    )
  }

  if (currentRoute.includes('projects') && id) {
    return hasMounted && (desktop || showMenu) ? (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li className={styles.breadcrumb}>
              <Link
                href={`/${network}/projects`}
                className={
                  currentRoute === `/${network}/projects`
                    ? styles.active
                    : undefined
                }
              >
                <ArrowLeft />
                {'projects'}
              </Link>
            </li>
          </ul>
          <li>{'class project'}</li>
          <ul>
            <li>
              <Link
                href={`/${network}/projects/${id}`}
                className={
                  currentRoute === `/${network}/projects/${id}`
                    ? styles.active
                    : undefined
                }
              >
                {'overview'}
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    ) : (
      <></>
    )
  }

  if (currentRoute.includes('resolvers') && id) {
    return hasMounted && (desktop || showMenu) ? (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li className={styles.breadcrumb}>
              <Link
                href={`/${network}/resolvers`}
                className={
                  currentRoute === `/${network}/resolvers`
                    ? styles.active
                    : undefined
                }
              >
                <ArrowLeft />
                {'resolvers'}
              </Link>
            </li>
          </ul>
          <li>{'resolver'}</li>
          <ul>
            <li>
              <Link
                href={`/${network}/resolvers/${id}`}
                className={
                  currentRoute === `/${network}/resolvers/${id}`
                    ? styles.active
                    : undefined
                }
              >
                {'overview'}
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    ) : (
      <></>
    )
  }

  if (currentRoute.includes('subjects') && id) {
    return hasMounted && (desktop || showMenu) ? (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li className={styles.breadcrumb}>
              <Link
                href={`/${network}/subjects`}
                className={
                  currentRoute === `/${network}/subjects`
                    ? styles.active
                    : undefined
                }
              >
                <ArrowLeft />
                {'subjects'}
              </Link>
            </li>
          </ul>
          <li>{'subject'}</li>
          <ul>
            <li>
              <Link
                href={`/${network}/subjects/${id}`}
                className={
                  currentRoute === `/${network}/subjects/${id}`
                    ? styles.active
                    : undefined
                }
              >
                {'overview'}
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    ) : (
      <></>
    )
  }

  if (currentRoute.includes('verifiers') && id) {
    return hasMounted && (desktop || showMenu) ? (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li className={styles.breadcrumb}>
              <Link
                href={`/${network}/verifiers`}
                className={
                  currentRoute === `/${network}/verifiers`
                    ? styles.active
                    : undefined
                }
              >
                <ArrowLeft />
                {'verifiers'}
              </Link>
            </li>
          </ul>
          <li>{'verifier'}</li>
          <ul>
            <li>
              <Link
                href={`/${network}/verifiers/${id}`}
                className={
                  currentRoute === `/${network}/verifiers/${id}`
                    ? styles.active
                    : undefined
                }
              >
                {'overview'}
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    ) : (
      <></>
    )
  }

  if (currentRoute.includes('vouchers') && id) {
    return hasMounted && (desktop || showMenu) ? (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li className={styles.breadcrumb}>
              <Link
                href={`/${network}/vouchers`}
                className={
                  currentRoute === `/${network}/vouchers`
                    ? styles.active
                    : undefined
                }
              >
                <ArrowLeft />
                {'vouchers'}
              </Link>
            </li>
          </ul>
          <li>{'voucher'}</li>
          <ul>
            <li>
              <Link
                href={`/${network}/vouchers/${id}`}
                className={
                  currentRoute === `/${network}/vouchers/${id}`
                    ? styles.active
                    : undefined
                }
              >
                {'overview'}
              </Link>
            </li>
          </ul>
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
          <ul className={styles.mobileOnly}>
            <li className={styles.breadcrumb}>
              <Link
                href={'/'}
                className={currentRoute === '/' ? styles.active : undefined}
              >
                <ArrowLeft />
                {'home'}
              </Link>
            </li>
          </ul>
        )}
        <li>{'explore'}</li>
        {!!network && network.includes('chora') && (
          <ul>
            <li>
              <Link
                href={`/${network}/claims`}
                className={
                  currentRoute === `/${network}/claims`
                    ? styles.active
                    : undefined
                }
              >
                {'claims'}
              </Link>
            </li>
            <li>
              <Link
                href={`/${network}/subjects`}
                className={
                  currentRoute === `/${network}/subjects`
                    ? styles.active
                    : undefined
                }
              >
                {'subjects'}
              </Link>
            </li>
            <li>
              <Link
                href={`/${network}/monitors`}
                className={
                  currentRoute === `/${network}/monitors`
                    ? styles.active
                    : undefined
                }
              >
                {'monitors'}
              </Link>
            </li>
            <li>
              <Link
                href={`/${network}/verifiers`}
                className={
                  currentRoute === `/${network}/verifiers`
                    ? styles.active
                    : undefined
                }
              >
                {'verifiers'}
              </Link>
            </li>
            <li>
              <Link
                href={`/${network}/vouchers`}
                className={
                  currentRoute === `/${network}/vouchers`
                    ? styles.active
                    : undefined
                }
              >
                {'vouchers'}
              </Link>
            </li>
            <li>
              <Link
                href={`/${network}/resolvers`}
                className={
                  currentRoute === `/${network}/resolvers`
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
                href={`/${network}/claims`}
                className={
                  currentRoute === `/${network}/claims`
                    ? styles.active
                    : undefined
                }
              >
                {'claims'}
              </Link>
            </li>
            <li>
              <Link
                href={`/${network}/classes`}
                className={
                  currentRoute === `/${network}/classes`
                    ? styles.active
                    : undefined
                }
              >
                {'classes'}
              </Link>
            </li>
            <li>
              <Link
                href={`/${network}/projects`}
                className={
                  currentRoute === `/${network}/projects`
                    ? styles.active
                    : undefined
                }
              >
                {'projects'}
              </Link>
            </li>
            <li>
              <Link
                href={`/${network}/batches`}
                className={
                  currentRoute === `/${network}/batches`
                    ? styles.active
                    : undefined
                }
              >
                {'batches'}
              </Link>
            </li>
            <li>
              <Link
                href={`/${network}/baskets`}
                className={
                  currentRoute === `/${network}/baskets`
                    ? styles.active
                    : undefined
                }
              >
                {'baskets'}
              </Link>
            </li>
            <li>
              <Link
                href={`/${network}/resolvers`}
                className={
                  currentRoute === `/${network}/resolvers`
                    ? styles.active
                    : undefined
                }
              >
                {'resolvers'}
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
