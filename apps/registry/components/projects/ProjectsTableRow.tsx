import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './ProjectsTableRow.module.css'

const ProjectsTableRow = ({ project }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <tr>
      <td>{project.id}</td>
      <td>{project.jurisdiction}</td>
      <td>
        {project.admin.substring(0, 13) +
          '...' +
          project.admin.substring(38, 44)}
        {wallet && project.admin === wallet.bech32Address && (
          <span className={styles.activeAccount}>{'(active account)'}</span>
        )}
      </td>
      <td style={{ minWidth: '120px' }}>
        <Link href={`/projects/${project.id}`}>{'view project'}</Link>
      </td>
    </tr>
  )
}

export default ProjectsTableRow
