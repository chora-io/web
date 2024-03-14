// import { Result } from 'chora/components'
// import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
// import { useContext } from 'react'

// import { useClassMetadata } from '@hooks/useClassMetadata'

import styles from './ClassPreview.module.css'

const ClassPreview = ({ clazz }: any) => {
  // const { chainInfo } = useContext(WalletContext)

  // fetch class metadata by iri from network server
  // const [metadata, error] = useClassMetadata(chainInfo, class.metadata)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'id'}</h3>
        <p>{clazz && clazz['id'] ? clazz['id'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'admin'}</h3>
        <p>{clazz && clazz['admin'] ? clazz['admin'] : 'NA'}</p>
      </div>
      <Link href={`/classes/${clazz['id']}`}>{'view credit class'}</Link>
      {/*{error && (*/}
      {/*  <div className={styles.boxText}>*/}
      {/*    <Result error={error} />*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  )
}

export default ClassPreview
