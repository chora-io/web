'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useClass } from '@hooks/useClass'

import styles from './Class.module.css'

const Class = () => {
  const { id } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch credit class from selected network
  const [clazz, classError] = useClass(chainInfo, `${id}`)

  // fetch metadata from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    clazz ? clazz.metadata : null,
  )

  const error = classError || metadataError

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'id'}</h3>
        <p>{id ? id : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'credit type abbrev'}</h3>
        <p>
          {clazz && clazz['credit_type_abbrev']
            ? clazz['credit_type_abbrev']
            : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'admin'}</h3>
        <p>{clazz && clazz['admin'] ? clazz['admin'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'metadata'}</h3>
        {error ? (
          <p>{clazz ? clazz.metadata : 'NA'}</p>
        ) : (
          <p>
            {clazz && clazz.metadata ? (
              <Link href={`/claims/${clazz.metadata}`}>{clazz.metadata}</Link>
            ) : (
              'NA'
            )}
          </p>
        )}
      </div>
      <hr />
      <div className={styles.boxText}>
        <h3>{'data stored on blockchain network'}</h3>
        <pre>
          <p>{JSON.stringify(clazz, null, ' ')}</p>
        </pre>
      </div>
      {metadata && (
        <div className={styles.boxText}>
          <h3>{'data stored with data provider service'}</h3>
          <pre>
            <p>{JSON.stringify(metadata, null, ' ')}</p>
          </pre>
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

export default Class
