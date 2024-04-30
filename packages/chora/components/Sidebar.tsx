'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import * as React from 'react'
import { useContext } from 'react'

import { MenuContext } from '../contexts'
import { BlankArrow } from '.'

import styles from './Sidebar.module.css'

const Sidebar = ({ items, mobile }: any) => {
  const { showMenu, setShowMenu } = useContext(MenuContext)
  const router = useRouter()
  const currentRoute = usePathname()

  const handleLink = (link: string) => {
    setShowMenu(false)
    router.push(link)
  }

  return !mobile || showMenu ? (
    <div className={mobile ? styles.mobile : styles.sidebar}>
      <ul>
        {items.map((item: any, i: number) =>
          item === 'divider' ? (
            <hr key={i} className={styles.divider} />
          ) : item.target === '_blank' ? (
            <li key={item.title}>
              <Link
                href={item.link}
                className={
                  currentRoute === item.link ? styles.active : undefined
                }
                target={item.target}
              >
                {item.title}
                {item.target && <BlankArrow color={'#00C3A5'} />}
              </Link>
            </li>
          ) : (
            <li key={item.title}>
              <button
                className={
                  currentRoute === item.link ? styles.active : styles.button
                }
                onClick={() => handleLink(item.link)}
              >
                {item.title}
              </button>
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
