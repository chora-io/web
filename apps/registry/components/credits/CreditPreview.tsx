// import { Result } from 'chora/components'
// import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
// import { useContext } from 'react'

// import { useCreditMetadata } from '@hooks/useCreditMetadata'

import styles from './CreditPreview.module.css'

const CreditPreview = ({ batch }: any) => {
  // const { chainInfo } = useContext(WalletContext)

  // fetch node metadata by iri from network server
  // const [metadata, error] = useCreditMetadata(chainInfo, batch.metadata)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'denom'}</h3>
        <p>{batch && batch['denom'] ? batch['denom'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'issuer'}</h3>
        <p>{batch && batch['issuer'] ? batch['issuer'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'issuance date'}</h3>
        <p>{batch && batch['issuance_date'] ? batch['issuance_date'] : 'NA'}</p>
      </div>
      <Link href={`/credits/${batch['denom']}`}>{'view credit batch'}</Link>
      {/*{error && (*/}
      {/*  <div className={styles.boxText}>*/}
      {/*    <Result error={error} />*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  )
}

export default CreditPreview
