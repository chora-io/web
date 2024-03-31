'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import styles from './Resolved.module.css'

const Resolved = () => {
  const { iri } = useParams()

  const { chainInfo } = useContext(WalletContext)

  const [metadata, metadataError, resolverUrl] = useMetadata(
    chainInfo,
    `${iri}`,
  )

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'iri'}</h3>
        <p>{iri ? iri.toString().replace('%3A', ':') : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'resolver url'}</h3>
        <p>{resolverUrl ? resolverUrl : 'NA'}</p>
      </div>
      <hr />
      {metadata && (
        <div className={styles.boxText}>
          <h3>{'data stored with data provider service'}</h3>
          <pre>
            <p>{JSON.stringify(metadata, null, ' ')}</p>
          </pre>
        </div>
      )}
      {metadataError && (
        <div className={styles.boxText}>
          <Result error={metadataError} />
        </div>
      )}
    </div>
  )
}

export default Resolved
