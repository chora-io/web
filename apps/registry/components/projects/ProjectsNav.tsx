'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './ProjectsNav.module.css'

const ProjectsNav = () => {
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/projects/create`}>{'create project'}</Link>
    </div>
  )
}

export default ProjectsNav
