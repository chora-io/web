'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './Sidebar.module.css'

const Sidebar = ({ items }: any) => {
  const currentRoute = usePathname()

  return (
    <div className={styles.sidebar}>
      <ul>
        {items.map((item: any) => (
          <li key={item.title}>
            <Link
              href={item.link}
              className={currentRoute === item.link ? styles.active : undefined}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
