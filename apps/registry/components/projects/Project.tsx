'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useProject } from '@hooks/useProject'
import { useResolver } from '@hooks/useResolver'
import { useResolverMetadata } from '@hooks/useResolverMetadata'

import styles from './Project.module.css'

const Project = () => {
  const { id } = useParams()

  const { chainInfo } = useContext(WalletContext)

  const [project, projectError] = useProject(chainInfo, `${id}`)
  const [resolvers, resolverError] = useResolver(
    chainInfo,
    project ? project.metadata : null,
  )
  const [metadata, metadataError] = useResolverMetadata(
    chainInfo,
    resolvers,
    project ? project.metadata : null,
  )

  const error = projectError || resolverError || metadataError

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
        <p>{project && project['metadata'] ? project['metadata'] : 'NA'}</p>
      </div>
      {metadata && (
        <div className={styles.boxText}>
          <h3>{'metadata'}</h3>
          <p>{JSON.stringify(metadata)}</p>
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
