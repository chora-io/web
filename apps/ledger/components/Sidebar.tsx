'use client'

import { WalletContext } from 'chora/contexts'
import { useNetworkModules } from 'chora/hooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'

import styles from './Sidebar.module.css'

const Sidebar = () => {
  const currentRoute = usePathname()
  const { chainInfo } = useContext(WalletContext)

  const [modules] = useNetworkModules(chainInfo)

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
        <ul className={styles.modules}>
          {modules?.some((m) => m.apiPackage === 'chora.content.v1') && (
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
          )}
          {modules?.some((m) => m.apiPackage === 'chora.geonode.v1') && (
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
          )}
          {modules?.some((m) => m.apiPackage === 'chora.validator.v1') && (
            <li>
              <Link
                href="/modules/chora.validator.v1"
                className={
                  currentRoute === '/modules/chora.validator.v1'
                    ? styles.active
                    : undefined
                }
              >
                {'chora.validator.v1'}
              </Link>
            </li>
          )}
          {modules?.some((m) => m.apiPackage === 'chora.voucher.v1') && (
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
          )}
          {modules?.some((m) => m.apiPackage === 'cosmos.auth.v1beta1') && (
            <li>
              <Link
                href="/modules/cosmos.auth.v1beta1"
                className={
                  currentRoute === '/modules/cosmos.auth.v1beta1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.auth.v1beta1'}
              </Link>
            </li>
          )}
          {modules?.some((m) => m.apiPackage === 'cosmos.authz.v1beta1') && (
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
          )}
          {modules?.some((m) => m.apiPackage === 'cosmos.bank.v1beta1') && (
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
          )}
          {modules?.some((m) => m.apiPackage === 'cosmos.circuit.v1') && (
            <li>
              <Link
                href="/modules/cosmos.circuit.v1"
                className={
                  currentRoute === '/modules/cosmos.circuit.v1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.circuit.v1'}
              </Link>
            </li>
          )}
          {modules?.some((m) => m.apiPackage === 'cosmos.consensus.v1') && (
            <li>
              <Link
                href="/modules/cosmos.consensus.v1"
                className={
                  currentRoute === '/modules/cosmos.consensus.v1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.consensus.v1'}
              </Link>
            </li>
          )}
          {modules?.some((m) => m.apiPackage === 'cosmos.crisis.v1beta1') && (
            <li>
              <Link
                href="/modules/cosmos.crisis.v1beta1"
                className={
                  currentRoute === '/modules/cosmos.crisis.v1beta1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.crisis.v1beta1'}
              </Link>
            </li>
          )}
          {modules?.some(
            (m) => m.apiPackage === 'cosmos.distribution.v1beta1',
          ) && (
            <li>
              <Link
                href="/modules/cosmos.distribution.v1beta1"
                className={
                  currentRoute === '/modules/cosmos.distribution.v1beta1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.distribution.v1beta1'}
              </Link>
            </li>
          )}
          {modules?.some((m) => m.apiPackage === 'cosmos.evidence.v1beta1') && (
            <li>
              <Link
                href="/modules/cosmos.evidence.v1beta1"
                className={
                  currentRoute === '/modules/cosmos.evidence.v1beta1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.evidence.v1beta1'}
              </Link>
            </li>
          )}
          {modules?.some((m) => m.apiPackage === 'cosmos.feegrant.v1beta1') && (
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
          )}
          {modules?.some((m) => m.apiPackage === 'cosmos.gov.v1') && (
            <li>
              <Link
                href="/modules/cosmos.gov.v1"
                className={
                  currentRoute === '/modules/cosmos.gov.v1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.gov.v1'}
              </Link>
            </li>
          )}
          {modules?.some((m) => m.apiPackage === 'cosmos.gov.v1beta1') && (
            <li>
              <Link
                href="/modules/cosmos.gov.v1beta1"
                className={
                  currentRoute === '/modules/cosmos.gov.v1beta1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.gov.v1beta1'}
              </Link>
            </li>
          )}
          {modules?.some((m) => m.apiPackage === 'cosmos.group.v1') && (
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
          )}
          {modules?.some((m) => m.apiPackage === 'cosmos.mint.v1beta1') && (
            <li>
              <Link
                href="/modules/cosmos.mint.v1beta1"
                className={
                  currentRoute === '/modules/cosmos.mint.v1beta1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.mint.v1beta1'}
              </Link>
            </li>
          )}
          {modules?.some((m) => m.apiPackage === 'cosmos.params.v1beta1') && (
            <li>
              <Link
                href="/modules/cosmos.params.v1beta1"
                className={
                  currentRoute === '/modules/cosmos.params.v1beta1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.params.v1beta1'}
              </Link>
            </li>
          )}
          {modules?.some((m) => m.apiPackage === 'cosmos.slashing.v1beta1') && (
            <li>
              <Link
                href="/modules/cosmos.slashing.v1beta1"
                className={
                  currentRoute === '/modules/cosmos.slashing.v1beta1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.slashing.v1beta1'}
              </Link>
            </li>
          )}
          {modules?.some((m) => m.apiPackage === 'cosmos.staking.v1beta1') && (
            <li>
              <Link
                href="/modules/cosmos.staking.v1beta1"
                className={
                  currentRoute === '/modules/cosmos.staking.v1beta1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.staking.v1beta1'}
              </Link>
            </li>
          )}
          {modules?.some((m) => m.apiPackage === 'cosmos.upgrade.v1beta1') && (
            <li>
              <Link
                href="/modules/cosmos.upgrade.v1beta1"
                className={
                  currentRoute === '/modules/cosmos.upgrade.v1beta1'
                    ? styles.active
                    : undefined
                }
              >
                {'cosmos.upgrade.v1beta1'}
              </Link>
            </li>
          )}
          {modules?.some((m) => m.apiPackage === 'regen.data.v1') && (
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
          )}
          {modules?.some((m) => m.apiPackage === 'regen.ecocredit.v1') && (
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
          )}
          {modules?.some(
            (m) => m.apiPackage === 'regen.ecocredit.basket.v1',
          ) && (
            <li>
              <Link
                href="/modules/regen.ecocredit.basket.v1"
                className={
                  currentRoute === '/modules/regen.ecocredit.basket.v1'
                    ? styles.active
                    : undefined
                }
              >
                {'regen.ecocredit.basket.v1'}
              </Link>
            </li>
          )}
          {modules?.some(
            (m) => m.apiPackage === 'regen.ecocredit.marketplace.v1',
          ) && (
            <li>
              <Link
                href="/modules/regen.ecocredit.marketplace.v1"
                className={
                  currentRoute === '/modules/regen.ecocredit.marketplace.v1'
                    ? styles.active
                    : undefined
                }
              >
                {'regen.ecocredit.marketplace.v1'}
              </Link>
            </li>
          )}
          {modules?.some((m) => m.apiPackage === 'regen.intertx.v1') && (
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
          )}
        </ul>
      </ul>
    </div>
  )
}

export default Sidebar
