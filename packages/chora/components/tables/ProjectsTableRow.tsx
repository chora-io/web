'use client'

import * as React from 'react'
import { useContext } from 'react'

import { WalletContext } from '../../contexts'
import { subAddress } from '../../utils'

import styles from './ProjectsTableRow.module.css'

const ProjectsTableRow = ({ project, renderAddress, renderLink }: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <tr>
      <td>{project.id}</td>
      <td>{project.jurisdiction}</td>
      {renderAddress ? (
        <td>{renderAddress(project.admin)}</td>
      ) : (
        <td>
          {subAddress(project.admin)}
          {wallet && project.admin === wallet.bech32Address && (
            <span className={styles.activeAccount}>{'(active account)'}</span>
          )}
        </td>
      )}
      <td style={{ minWidth: '120px' }}>
        {renderLink && renderLink(project.id)}
      </td>
    </tr>
  )
}

export default ProjectsTableRow
