'use client'

import { AuthContext, WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useContext } from 'react'

import styles from './Sidebar.module.css'

const Sidebar = () => {
  const { network } = useContext(WalletContext)
  const { activeAccount } = useContext(AuthContext)
  const { denom, id, iri } = useParams()
  const currentRoute = usePathname()

  if (currentRoute.includes('claims') && iri) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li style={{ padding: '1em 0' }}>
              <Link
                href="/claims"
                className={
                  currentRoute === '/claims' ? styles.active : undefined
                }
              >
                {'← claims'}
              </Link>
            </li>
          </ul>
          <li>{'data claim'}</li>
          <ul>
            <li>
              <Link
                href={`/claims/${iri}`}
                className={
                  currentRoute === `/claims/${iri}` ? styles.active : undefined
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

  if (currentRoute.includes('classes') && id) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li style={{ padding: '1em 0' }}>
              <Link
                href="/classes"
                className={
                  currentRoute === '/classes' ? styles.active : undefined
                }
              >
                {'← classes'}
              </Link>
            </li>
          </ul>
          <li>{'credit class'}</li>
          <ul>
            <li>
              <Link
                href={`/classes/${id}`}
                className={
                  currentRoute === `/classes/${id}` ? styles.active : undefined
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

  if (currentRoute.includes('batches') && denom) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li style={{ padding: '1em 0' }}>
              <Link
                href="/batches"
                className={
                  currentRoute === '/batches' ? styles.active : undefined
                }
              >
                {'← batches'}
              </Link>
            </li>
          </ul>
          <li>{'credit batch'}</li>
          <ul>
            <li>
              <Link
                href={`/batches/${denom}`}
                className={
                  currentRoute === `/batches/${denom}`
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
    )
  }

  if (currentRoute.includes('baskets') && denom) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li style={{ padding: '1em 0' }}>
              <Link
                href="/baskets"
                className={
                  currentRoute === '/baskets' ? styles.active : undefined
                }
              >
                {'← baskets'}
              </Link>
            </li>
          </ul>
          <li>{'credit basket'}</li>
          <ul>
            <li>
              <Link
                href={`/baskets/${denom}`}
                className={
                  currentRoute === `/baskets/${denom}`
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
    )
  }

  if (currentRoute.includes('geonodes') && id) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li style={{ padding: '1em 0' }}>
              <Link
                href="/geonodes"
                className={
                  currentRoute === '/geonodes' ? styles.active : undefined
                }
              >
                {'← geonodes'}
              </Link>
            </li>
          </ul>
          <li>{'geonode'}</li>
          <ul>
            <li>
              <Link
                href={`/geonodes/${id}`}
                className={
                  currentRoute === `/geonodes/${id}` ? styles.active : undefined
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

  if (currentRoute.includes('projects') && id) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li style={{ padding: '1em 0' }}>
              <Link
                href="/projects"
                className={
                  currentRoute === '/projects' ? styles.active : undefined
                }
              >
                {'← projects'}
              </Link>
            </li>
          </ul>
          <li>{'class project'}</li>
          <ul>
            <li>
              <Link
                href={`/projects/${id}`}
                className={
                  currentRoute === `/projects/${id}` ? styles.active : undefined
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

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>{'explore'}</li>
        {!!network && network.includes('chora') && (
          <ul>
            <li>
              <Link
                href="/claims"
                className={
                  currentRoute === '/claims' ? styles.active : undefined
                }
              >
                {'claims'}
              </Link>
            </li>
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
                href="/claims"
                className={
                  currentRoute === '/claims' ? styles.active : undefined
                }
              >
                {'claims'}
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
            <li>
              <Link
                href="/batches"
                className={
                  currentRoute === '/batches' ? styles.active : undefined
                }
              >
                {'batches'}
              </Link>
            </li>
            <li>
              <Link
                href="/baskets"
                className={
                  currentRoute === '/baskets' ? styles.active : undefined
                }
              >
                {'baskets'}
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
