import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

// import { useProjectMetadata } from '@hooks/useProjectMetadata'

import styles from './ProjectPreview.module.css'

const ProjectPreview = ({ project }: any) => {
  const { chainInfo } = useContext(WalletContext)

  // fetch class metadata by iri from network server
  // const [metadata, error] = useProjectMetadata(chainInfo, class.metadata)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'id'}</h3>
        <p>{project && project['id'] ? project['id'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'admin'}</h3>
        <p>{project && project['admin'] ? project['admin'] : 'NA'}</p>
      </div>
      <Link href={`/projects/${project['id']}`}>{'view class project'}</Link>
      {/*{error && (*/}
      {/*  <div className={styles.boxText}>*/}
      {/*    <Result error={error} />*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  )
}

export default ProjectPreview
