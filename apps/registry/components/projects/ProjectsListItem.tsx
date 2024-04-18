import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './ProjectsListItem.module.css'

const ProjectsListItem = ({ project }: any) => {
  const { network, wallet } = useContext(WalletContext)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'id'}</h3>
        <p>{project.id}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'jurisdiction'}</h3>
        <p>{project.jurisdiction}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'admin'}</h3>
        <p>
          {project.admin}
          {wallet && project.issuer === wallet.bech32Address && (
            <span className={styles.activeAccount}>{'(active account)'}</span>
          )}
        </p>
      </div>
      <Link href={`/${network}/projects/${project.id}`}>{'view project'}</Link>
    </div>
  )
}

export default ProjectsListItem
