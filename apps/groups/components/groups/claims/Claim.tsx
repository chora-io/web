'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useClaim, useMetadata } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

import styles from './Claim.module.css'

const Claim = () => {
  const { iri } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch subject from selected network
  const [subject, subjectError] = useClaim(chainInfo, `${iri}`)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    subject ? subject.metadata : null,
  )

  const error = subjectError || metadataError

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'name'}</h3>
        <p>{metadata && metadata['name'] ? metadata['name'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'description'}</h3>
        <p>
          {metadata && metadata['description'] ? metadata['description'] : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'steward'}</h3>
        <p>{subject?.curator ? <Address address={subject.curator} /> : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'latitude'}</h3>
        <p>
          {metadata && metadata['geo'] && metadata['geo']['latitude']
            ? metadata['geo']['latitude']
            : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'longitude'}</h3>
        <p>
          {metadata && metadata['geo'] && metadata['geo']['longitude']
            ? metadata['geo']['longitude']
            : 'NA'}
        </p>
      </div>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Claim
