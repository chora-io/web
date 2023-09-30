import { formatTimestamp } from 'chora/utils'

import Address from '@components/Address'

import styles from './AuthzGrant.module.css'

const AuthzGrant = ({ grant }: { address: string }) => {
  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'granter'}</h3>
        <p>
          <Address address={grant?.granter} />
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'grantee'}</h3>
        <p>
          <Address address={grant?.grantee} />
        </p>
      </div>
      {grant['authorization']['@type'] ===
        '/cosmos.authz.v1beta1.GenericAuthorization' && (
        <div className={styles.boxText}>
          <h3>{'message'}</h3>
          <p>{grant['authorization']['msg']}</p>
        </div>
      )}
      <div className={styles.boxText}>
        <h3>{'expiration'}</h3>
        <p>{formatTimestamp(grant['expiration'])}</p>
      </div>
    </div>
  )
}

export default AuthzGrant
