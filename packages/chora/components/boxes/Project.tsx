'use client'

import * as React from 'react'
import { useContext } from 'react'

import { Result } from '..'
import { WalletContext } from '../../contexts'

import styles from './Project.module.css'

const Project = ({
  project,
  metadata,
  error,
  renderAddress,
  renderMetadata,
  renderClassId,
}: any) => {
  const { wallet } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'id'}</h3>
        <p>{project?.id || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'jurisdiction'}</h3>
        <p>{project?.jurisdiction || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'admin'}</h3>
        {project && renderAddress ? (
          <p>{renderAddress(project.admin)}</p>
        ) : (
          <p>
            {project?.admin || 'NA'}
            {wallet && project?.admin === wallet.bech32Address && (
              <span className={styles.activeAccount}>{'(active account)'}</span>
            )}
          </p>
        )}
      </div>
      <div className={styles.boxText}>
        <h3>{'class id'}</h3>
        {project && renderClassId ? (
          <p>{renderClassId(project['class_id'])}</p>
        ) : (
          <p>{project ? project['class_id'] : 'NA'}</p>
        )}
      </div>
      <div className={styles.boxText}>
        <h3>{'reference id'}</h3>
        <p>{project ? project['reference_id'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'metadata'}</h3>
        {metadata && renderMetadata ? (
          <p>{renderMetadata(project.metadata)}</p>
        ) : (
          <p>{project?.metadata || 'NA'}</p>
        )}
      </div>
      <hr />
      <div className={styles.boxText}>
        <h3>{'data stored on blockchain network'}</h3>
        <pre>
          <p>{JSON.stringify(project, null, ' ')}</p>
        </pre>
      </div>
      {metadata && (
        <div className={styles.boxText}>
          <h3>{'data stored with data provider service'}</h3>
          <pre>
            <p>{JSON.stringify(metadata, null, ' ')}</p>
          </pre>
        </div>
      )}
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Project
