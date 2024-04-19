import Address from '@components/Address'

import styles from './BatchPreview.module.css'

const BatchPreview = ({ batch }: any) => {
  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'denom'}</h3>
        <p>{batch['denom'] || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'issuance date'}</h3>
        <p>{batch['issuance_date'] || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'issuer'}</h3>
        <p>{batch['issuer'] ? <Address address={batch['issuer']} /> : 'NA'}</p>
      </div>
    </div>
  )
}

export default BatchPreview
