import Address from '@components/Address'

import styles from './ProjectPreview.module.css'

const ProjectPreview = ({ project }: any) => {
  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'id'}</h3>
        <p>{project['id'] || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'jurisdiction'}</h3>
        <p>{project['jurisdiction'] || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'admin'}</h3>
        <p>
          {project['admin'] ? <Address address={project['admin']} /> : 'NA'}
        </p>
      </div>
    </div>
  )
}

export default ProjectPreview
