'use client'

import * as React from 'react'
import { useContext } from 'react'

import { WalletContext } from '../../contexts'

import styles from './ProjectsListItem.module.css'

const ProjectsListItem = ({ project, renderAddress, renderLink }: any) => {
  const { wallet } = useContext(WalletContext)

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
          {renderAddress ? (
            renderAddress(project.admin)
          ) : (
            <>
              {project.admin}
              {wallet && project.admin === wallet.bech32Address && (
                <span className={styles.activeAccount}>
                  {'(active account)'}
                </span>
              )}
            </>
          )}
        </p>
      </div>
      {renderLink && renderLink(project.id)}
    </div>
  )
}

export default ProjectsListItem
