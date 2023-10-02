'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './Sidebar.module.css'

const Sidebar = () => {
  const currentRoute = usePathname()

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <Link
            href="/"
            className={currentRoute === '/' ? styles.active : undefined}
          >
            {'home'}
          </Link>
        </li>
        <li>
          <Link
            href="/completion"
            className={currentRoute === '/completion' ? styles.active : undefined}
          >
            {'completion'}
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
