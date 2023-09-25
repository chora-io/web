import Link from "next/link"
import { usePathname } from "next/navigation"

import styles from "./Sidebar.module.css"

const Sidebar = () => {

  const currentRoute = usePathname()

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <Link href="/" className={currentRoute === "/" ? styles.active : undefined}>
            {"home"}
          </Link>
        </li>
        <li>
          <Link href="/search" className={currentRoute === "/search" ? styles.active : undefined}>
            {"search"}
          </Link>
        </li>
        <li>
          <Link href="/convert" className={currentRoute === "/convert" ? styles.active : undefined}>
            {"convert"}
          </Link>
        </li>
        <li>
          <Link href="/server" className={currentRoute === "/server" ? styles.active : undefined}>
            {"server"}
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
