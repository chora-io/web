import Link from 'next/link'

import styles from './ProposalsNav.module.css'

const ProposalsNav = () => (
  <div className={styles.box}>
    <Link href="/proposals/new">{'submit proposal'}</Link>
  </div>
)

export default ProposalsNav
