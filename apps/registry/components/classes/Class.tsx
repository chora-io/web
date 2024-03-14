'use client'

// import { Result } from 'chora/components'
// import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
// import { useContext } from 'react'

// import { useClass } from '@hooks/useClass'

import styles from './Class.module.css'

const Class = () => {
  const { id } = useParams()

  // const { chainInfo } = useContext(WalletContext)

  // fetch class and class metadata from selected network and network server
  // const [clazz, metadata, error] = useClass(chainInfo, `${id}`)

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'id'}</h3>
        <p>{id ? id : 'NA'}</p>
      </div>
      {/*<div className={styles.boxText}>*/}
      {/*  <h3>{'issuer'}</h3>*/}
      {/*  <p>{clazz && clazz['issuer'] ? clazz['issuer'] : 'NA'}</p>*/}
      {/*</div>*/}
      {/*<div className={styles.boxText}>*/}
      {/*  <h3>{'issuance date'}</h3>*/}
      {/*  <p>{clazz && clazz['issuance_date'] ? clazz['issuance_date'] : 'NA'}</p>*/}
      {/*</div>*/}
      {/*{error && (*/}
      {/*  <div className={styles.boxText}>*/}
      {/*    <Result error={error} />*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  )
}

export default Class
