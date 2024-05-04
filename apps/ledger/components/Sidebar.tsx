'use client'

import { ArrowLeft } from 'chora/components/icons'
import { MenuContext, WalletContext } from 'chora/contexts'
import { useNetworkModules } from 'chora/hooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

import styles from './Sidebar.module.css'

const Sidebar = () => {
  const currentRoute = usePathname()
  const { showMenu, setShowMenu } = useContext(MenuContext)
  const { chainInfo, network } = useContext(WalletContext)

  const [modules] = useNetworkModules(chainInfo)

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

  return hasMounted && (desktop || showMenu) ? (
    <div className={styles.sidebar}>
      <ul>
        {currentRoute !== '/' && (
          <ul className={styles.mobileOnly}>
            <li style={{ padding: '1em 0.5em' }}>
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
        <li>{'account'}</li>
        <ul>
          <li>
            <Link
              href={`/${network}/account`}
              className={
                currentRoute === `/${network}/account`
                  ? styles.active
                  : undefined
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
              href={`/${network}/network`}
              className={
                currentRoute === `/${network}/network`
                  ? styles.active
                  : undefined
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
                href={`/${network}/modules/chora.content.v1`}
                className={
                  currentRoute === `/${network}/modules/chora.content.v1`
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
                href={`/${network}/modules/chora.geonode.v1`}
                className={
                  currentRoute === `/${network}/modules/chora.geonode.v1`
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
                href={`/${network}/modules/chora.validator.v1`}
                className={
                  currentRoute === `/${network}/modules/chora.validator.v1`
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
                href={`/${network}/modules/chora.voucher.v1`}
                className={
                  currentRoute === `/${network}/modules/chora.voucher.v1`
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
                href={`/${network}/modules/cosmos.auth.v1beta1`}
                className={
                  currentRoute === `/${network}/modules/cosmos.auth.v1beta1`
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
                href={`/${network}/modules/cosmos.authz.v1beta1`}
                className={
                  currentRoute === `/${network}/modules/cosmos.authz.v1beta1`
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
                href={`/${network}/modules/cosmos.bank.v1beta1`}
                className={
                  currentRoute === `/${network}/modules/cosmos.bank.v1beta1`
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
                href={`/${network}/modules/cosmos.circuit.v1`}
                className={
                  currentRoute === `/${network}/modules/cosmos.circuit.v1`
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
                href={`/${network}/modules/cosmos.consensus.v1`}
                className={
                  currentRoute === `/${network}/modules/cosmos.consensus.v1`
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
                href={`/${network}/modules/cosmos.crisis.v1beta1`}
                className={
                  currentRoute === `/${network}/modules/cosmos.crisis.v1beta1`
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
                href={`/${network}/modules/cosmos.distribution.v1beta1`}
                className={
                  currentRoute ===
                  `/${network}/modules/cosmos.distribution.v1beta1`
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
                href={`/${network}/modules/cosmos.evidence.v1beta1`}
                className={
                  currentRoute === `/${network}/modules/cosmos.evidence.v1beta1`
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
                href={`/${network}/modules/cosmos.feegrant.v1beta1`}
                className={
                  currentRoute === `/${network}/modules/cosmos.feegrant.v1beta1`
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
                href={`/${network}/modules/cosmos.gov.v1`}
                className={
                  currentRoute === `/${network}/modules/cosmos.gov.v1`
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
                href={`/${network}/modules/cosmos.gov.v1beta1`}
                className={
                  currentRoute === `/${network}/modules/cosmos.gov.v1beta1`
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
                href={`/${network}/modules/cosmos.group.v1`}
                className={
                  currentRoute === `/${network}/modules/cosmos.group.v1`
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
                href={`/${network}/modules/cosmos.mint.v1beta1`}
                className={
                  currentRoute === `/${network}/modules/cosmos.mint.v1beta1`
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
                href={`/${network}/modules/cosmos.params.v1beta1`}
                className={
                  currentRoute === `/${network}/modules/cosmos.params.v1beta1`
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
                href={`/${network}/modules/cosmos.slashing.v1beta1`}
                className={
                  currentRoute === `/${network}/modules/cosmos.slashing.v1beta1`
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
                href={`/${network}/modules/cosmos.staking.v1beta1`}
                className={
                  currentRoute === `/${network}/modules/cosmos.staking.v1beta1`
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
                href={`/${network}/modules/cosmos.upgrade.v1beta1`}
                className={
                  currentRoute === `/${network}/modules/cosmos.upgrade.v1beta1`
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
                href={`/${network}/modules/regen.data.v1`}
                className={
                  currentRoute === `/${network}/modules/regen.data.v1`
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
                href={`/${network}/modules/regen.ecocredit.v1`}
                className={
                  currentRoute === `/${network}/modules/regen.ecocredit.v1`
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
                href={`/${network}/modules/regen.ecocredit.basket.v1`}
                className={
                  currentRoute ===
                  `/${network}/modules/regen.ecocredit.basket.v1`
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
                href={`/${network}/modules/regen.ecocredit.marketplace.v1`}
                className={
                  currentRoute ===
                  `/${network}/modules/regen.ecocredit.marketplace.v1`
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
                href={`/${network}/modules/regen.intertx.v1`}
                className={
                  currentRoute === `/${network}/modules/regen.intertx.v1`
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
  ) : (
    <></>
  )
}

export default Sidebar
