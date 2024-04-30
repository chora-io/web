'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useContext } from 'react'

import { MenuContext } from '../contexts'

import styles from './MobileMenu.module.css'
import { BlankArrow } from './index'

const MobileMenu = ({ itemsTop, itemsBottom }: any) => {
  const { showMenu, setShowMenu } = useContext(MenuContext)
  const router = useRouter()

  const handleLink = (link: string) => {
    setShowMenu(false)
    router.push(link)
  }

  return showMenu ? (
    <div className={styles.sidebar}>
      <div>
        {(itemsTop || itemsBottom) && (
          <ul>
            {itemsTop &&
              itemsTop.map((item: any) => (
                <li key={item.title}>
                  <button
                    className={styles.button}
                    onClick={() => handleLink(item.link)}
                  >
                    {item.title}
                    {item.target && <BlankArrow color={'#00C3A5'} />}
                  </button>
                </li>
              ))}
            {itemsTop && itemsBottom && <hr className={styles.divider} />}
            {itemsBottom &&
              itemsBottom.map((item: any) => (
                <li key={item.title}>
                  <Link href={item.link} target={item.target}>
                    {item.title}
                    {item.target && <BlankArrow color={'#00C3A5'} />}
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default MobileMenu
