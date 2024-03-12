import Link from 'next/link'

import styles from './MembersNav.module.css'

const MembersNav = () => (
  <div className={styles.box}>
    <Link href="/members/submit">{'submit application'}</Link>
  </div>
)

export default MembersNav
