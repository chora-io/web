'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'

import { MenuContext } from '../contexts'
import { ArrowUpRight } from '.'

import styles from './Sidebar.module.css'

const Sidebar = ({ items, mobileOnly }: any) => {
  const { showMenu, setShowMenu } = useContext(MenuContext)
  const currentRoute = usePathname()

  const [initRoute, setInitRoute] = useState<string>('')

  useEffect(() => {
    if (currentRoute && !initRoute) {
      setInitRoute(currentRoute)
    }
    if (initRoute && initRoute !== currentRoute) {
      setInitRoute(currentRoute)
      setShowMenu(false)
    }
  }, [currentRoute, initRoute, setShowMenu])

  return !mobileOnly || showMenu ? (
    <div className={mobileOnly ? styles.mobileOnly : styles.sidebar}>
      <ul>
        {items.map((item: any, i: number) =>
          item === 'divider' ? (
            <hr key={i} className={styles.divider} />
          ) : (
            <li key={item.title}>
              <Link
                href={item.link}
                className={
                  currentRoute === item.link ? styles.active : undefined
                }
                target={item.target}
              >
                {item.title}
                {item.target === '_blank' && <ArrowUpRight />}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  ) : (
    <></>
  )
}

export default Sidebar
