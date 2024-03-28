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
        <li>{'account'}</li>
        <ul>
          <li>
            <Link
              href="/account"
              className={
                currentRoute === '/account' ? styles.active : undefined
              }
            >
              {'overview'}
            </Link>
          </li>
        </ul>
        <li>{'network'}</li>
        <ul>
          <li>
            <Link
              href="/network"
              className={
                currentRoute === '/network' ? styles.active : undefined
              }
            >
              {'overview'}
            </Link>
          </li>
        </ul>
        <li>{'modules'}</li>
        {!!network && network.includes('chora') && (
          <ul className={styles.modules}>
            <li>
              <Link
                href="/modules/chora.content.v1"
                className={
                  currentRoute === '/modules/chora.content.v1'
                    ? styles.active
                    : undefined
                }
              >
                {'chora.content.v1'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/chora.geonode.v1"
                className={
                  currentRoute === '/modules/chora.geonode.v1'
                    ? styles.active
                    : undefined
                }
              >
                {'chora.geonode.v1'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/chora.voucher.v1"
                className={
                  currentRoute === '/modules/chora.voucher.v1'
                    ? styles.active
                    : undefined
                }
              >
                {'chora.voucher.v1'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/cosmos.authz.v1beta1"
                className={
                  currentRoute === '/modules/cosmos.authz.v1beta1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.authz.v1beta1'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/cosmos.bank.v1beta1"
                className={
                  currentRoute === '/modules/cosmos.bank.v1beta1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.bank.v1beta1'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/cosmos.feegrant.v1beta1"
                className={
                  currentRoute === '/modules/cosmos.feegrant.v1beta1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.feegrant.v1beta1'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/cosmos.group.v1"
                className={
                  currentRoute === '/modules/cosmos.group.v1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.group.v1'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/regen.data.v1"
                className={
                  currentRoute === '/modules/regen.data.v1'
                    ? styles.active
                    : undefined
                }
              >
                {'regen.data.v1'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/regen.intertx.v1"
                className={
                  currentRoute === '/modules/regen.intertx.v1'
                    ? styles.active
                    : undefined
                }
              >
                {'regen.intertx.v1'}
              </Link>
            </li>
          </ul>
        )}
        {!!network && network.includes('regen') && (
          <ul className={styles.modules}>
            <li>
              <Link
                href="/modules/cosmos.authz.v1beta1"
                className={
                  currentRoute === '/modules/cosmos.authz.v1beta1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.authz.v1beta1'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/cosmos.bank.v1beta1"
                className={
                  currentRoute === '/modules/cosmos.bank.v1beta1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.bank.v1beta1'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/cosmos.feegrant.v1beta1"
                className={
                  currentRoute === '/modules/cosmos.feegrant.v1beta1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.feegrant.v1beta1'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/cosmos.group.v1"
                className={
                  currentRoute === '/modules/cosmos.group.v1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.group.v1'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/regen.data.v1"
                className={
                  currentRoute === '/modules/regen.data.v1'
                    ? styles.active
                    : undefined
                }
              >
                {'regen.data.v1'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/regen.ecocredit.v1"
                className={
                  currentRoute === '/modules/regen.ecocredit.v1'
                    ? styles.active
                    : undefined
                }
              >
                {'regen.ecocredit.v1'}
              </Link>
            </li>
            <li>
              <Link
                href="/modules/regen.intertx.v1"
                className={
                  currentRoute === '/modules/regen.intertx.v1'
                    ? styles.active
                    : undefined
                }
              >
                {'regen.intertx.v1'}
              </Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
