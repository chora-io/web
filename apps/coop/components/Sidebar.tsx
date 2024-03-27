'use client'

import { AuthContext, WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useContext } from 'react'

import styles from './Sidebar.module.css'

const Sidebar = () => {
  const { groupId } = useParams()

  const { account } = useContext(AuthContext)

  const { network } = useContext(WalletContext)

  const currentRoute = usePathname()

  if (groupId) {
    return (
      <ul>
        <ul>
          <li style={{ padding: '1em 0' }}>
            <Link
              href="/groups"
              className={currentRoute === '/groups' ? styles.active : undefined}
            >
              {'← groups'}
            </Link>
          </li>
        </ul>
        <li>{'group'}</li>
        <ul>
          <li>
            <Link
              href={`/groups/${groupId}`}
              className={
                currentRoute === `/groups/${groupId}`
                  ? styles.active
                  : undefined
              }
            >
              {'overview'}
            </Link>
          </li>
          <li>
            <Link
              href={`/groups/${groupId}/accounts`}
              className={
                currentRoute === `/groups/${groupId}/accounts`
                  ? styles.active
                  : undefined
              }
            >
              {'accounts'}
            </Link>
          </li>
          <li>
            <Link
              href={`/groups/${groupId}/members`}
              className={
                currentRoute === `/groups/${groupId}/members`
                  ? styles.active
                  : undefined
              }
            >
              {'members'}
            </Link>
          </li>
          <li>
            <Link
              href={`/groups/${groupId}/proposals`}
              className={
                currentRoute === `/groups/${groupId}/proposals`
                  ? styles.active
                  : undefined
              }
            >
              {'proposals'}
            </Link>
          </li>
        </ul>
        <li>{'extensions'}</li>
        {!!network && network.includes('chora') && (
          <ul>
            <li>
              <Link
                href={`/groups/${groupId}/geonodes`}
                className={
                  currentRoute === `/groups/${groupId}/geonodes`
                    ? styles.active
                    : undefined
                }
              >
                {'geonodes'}
              </Link>
            </li>
            <li>
              <Link
                href={`/groups/${groupId}/vouchers`}
                className={
                  currentRoute === `/groups/${groupId}/vouchers`
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
                href={`/groups/${groupId}/classes`}
                className={
                  currentRoute === `/groups/${groupId}/classes`
                    ? styles.active
                    : undefined
                }
              >
                {'classes'}
              </Link>
            </li>
            <li>
              <Link
                href={`/groups/${groupId}/projects`}
                className={
                  currentRoute === `/groups/${groupId}/projects`
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
              href={`/groups/${groupId}/resolvers`}
              className={
                currentRoute === `/groups/${groupId}/resolvers`
                  ? styles.active
                  : undefined
              }
            >
              {'resolvers'}
            </Link>
          </li>
        </ul>
      </ul>
    )
  }

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>{'explore'}</li>
        <ul>
          <li>
            <Link
              href="/groups"
              className={currentRoute === '/groups' ? styles.active : undefined}
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
