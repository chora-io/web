'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useContext } from 'react'

import styles from './Sidebar.module.css'

const Sidebar = () => {
  const { network } = useContext(WalletContext)
  const { denom, id, iri } = useParams()
  const currentRoute = usePathname()

  if (currentRoute.includes('claims') && iri) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li style={{ padding: '1em 0' }}>
              <Link
                href={`/${network}/claims`}
                className={
                  currentRoute === `/${network}/claims`
                    ? styles.active
                    : undefined
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
    )
  }

  if (currentRoute.includes('classes') && id) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li style={{ padding: '1em 0' }}>
              <Link
                href={`/${network}/classes`}
                className={
                  currentRoute === `/${network}/classes`
                    ? styles.active
                    : undefined
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
    )
  }

  if (currentRoute.includes('batches') && denom) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li style={{ padding: '1em 0' }}>
              <Link
                href={`/${network}/batches`}
                className={
                  currentRoute === `/${network}/batches`
                    ? styles.active
                    : undefined
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
    )
  }

  if (currentRoute.includes('baskets') && denom) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li style={{ padding: '1em 0' }}>
              <Link
                href={`/${network}/baskets`}
                className={
                  currentRoute === `/${network}/baskets`
                    ? styles.active
                    : undefined
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
    )
  }

  if (currentRoute.includes('monitors') && id) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li style={{ padding: '1em 0' }}>
              <Link
                href={`/${network}/monitors`}
                className={
                  currentRoute === `/${network}/monitors`
                    ? styles.active
                    : undefined
                }
              >
                {'← monitors'}
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
    )
  }

  if (currentRoute.includes('projects') && id) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li style={{ padding: '1em 0' }}>
              <Link
                href={`/${network}/projects`}
                className={
                  currentRoute === `/${network}/projects`
                    ? styles.active
                    : undefined
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
    )
  }

  if (currentRoute.includes('resolvers') && id) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li style={{ padding: '1em 0' }}>
              <Link
                href={`/${network}/resolvers`}
                className={
                  currentRoute === `/${network}/resolvers`
                    ? styles.active
                    : undefined
                }
              >
                {'← resolvers'}
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
    )
  }

  if (currentRoute.includes('subjects') && id) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li style={{ padding: '1em 0' }}>
              <Link
                href={`/${network}/subjects`}
                className={
                  currentRoute === `/${network}/subjects`
                    ? styles.active
                    : undefined
                }
              >
                {'← subjects'}
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
    )
  }

  if (currentRoute.includes('verifiers') && id) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li style={{ padding: '1em 0' }}>
              <Link
                href={`/${network}/verifiers`}
                className={
                  currentRoute === `/${network}/verifiers`
                    ? styles.active
                    : undefined
                }
              >
                {'← verifiers'}
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
    )
  }

  if (currentRoute.includes('vouchers') && id) {
    return (
      <div className={styles.sidebar}>
        <ul>
          <ul>
            <li style={{ padding: '1em 0' }}>
              <Link
                href={`/${network}/vouchers`}
                className={
                  currentRoute === `/${network}/vouchers`
                    ? styles.active
                    : undefined
                }
              >
                {'← vouchers'}
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
  )
}

export default Sidebar
