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
            href="/policies"
            className={currentRoute === '/policies' ? styles.active : undefined}
          >
            {'policies'}
          </Link>
        </li>
        <li>
          <Link
            href="/members"
            className={currentRoute === '/members' ? styles.active : undefined}
          >
            {'members'}
          </Link>
        </li>
        <li>
          <Link
            href="/proposals"
            className={
              currentRoute === '/proposals' ? styles.active : undefined
            }
          >
            {'proposals'}
          </Link>
        </li>
        <li>
          <Link
            href="/geonodes"
            className={currentRoute === '/geonodes' ? styles.active : undefined}
          >
            {'geonodes'}
          </Link>
        </li>
        <li>
          <Link
            href="/vouchers"
            className={currentRoute === '/vouchers' ? styles.active : undefined}
          >
            {'vouchers'}
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
