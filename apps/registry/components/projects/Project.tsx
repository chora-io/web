'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useProject } from '@hooks/useProject'

import styles from './Project.module.css'

const Project = () => {
  const { id } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch project from selected network
  const [project, projectError] = useProject(chainInfo, `${id}`)

  // fetch metadata from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    project ? project.metadata : null,
  )

  const error = projectError || metadataError

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'id'}</h3>
        <p>{id ? id : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'jurisdiction'}</h3>
        <p>
          {project && project['jurisdiction'] ? project['jurisdiction'] : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'admin'}</h3>
        <p>{project && project['admin'] ? project['admin'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'class id'}</h3>
        <p>
          {project && project['class_id'] ? (
            <Link href={`/classes/${project['class_id']}`}>
              {project['class_id']}
            </Link>
          ) : (
            'NA'
          )}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'reference id'}</h3>
        <p>
          {project && project['reference_id'] ? project['reference_id'] : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'metadata'}</h3>
        {error ? (
          <p>{project ? project.metadata : 'NA'}</p>
        ) : (
          <p>
            {project && project.metadata ? (
              <Link href={`/claims/${project.metadata}`}>
                {project.metadata}
              </Link>
            ) : (
              'NA'
            )}
          </p>
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
