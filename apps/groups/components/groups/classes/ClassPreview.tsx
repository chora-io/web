import Address from '@components/Address'

import styles from './ClassPreview.module.css'

const ClassPreview = ({ clazz }: any) => {
  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'id'}</h3>
        <p>{clazz['id'] || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'credit type abbrev'}</h3>
        <p>{clazz['credit_type_abbrev'] || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'admin'}</h3>
        <p>{clazz['admin'] ? <Address address={clazz['admin']} /> : 'NA'}</p>
      </div>
    </div>
  )
}

export default ClassPreview
