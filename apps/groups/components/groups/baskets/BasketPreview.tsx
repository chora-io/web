import Address from '@components/Address'

import styles from './BasketPreview.module.css'

const BasketPreview = ({ basket }: any) => {
  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'denom'}</h3>
        <p>{basket['denom'] || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'credit type abbrev'}</h3>
        <p>{basket['credit_type_abbrev'] || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'curator'}</h3>
        <p>
          {basket['curator'] ? <Address address={basket['curator']} /> : 'NA'}
        </p>
      </div>
    </div>
  )
}

export default BasketPreview
