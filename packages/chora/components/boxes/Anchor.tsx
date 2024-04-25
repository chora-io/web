'use client'

import * as React from 'react'

import { Result } from '..'
import { formatTimestamp } from '../../utils'

import styles from './Anchor.module.css'

const Anchor = ({ anchor, error }: any) => {
  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'iri'}</h3>
        <p>{anchor?.iri || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'timestamp'}</h3>
        <p>{anchor ? formatTimestamp(anchor.timestamp) : 'NA'}</p>
      </div>
      <hr />
      <div className={styles.boxText}>
        <h3>{'data stored on blockchain network'}</h3>
        <pre>
          <p>{JSON.stringify(anchor, null, ' ')}</p>
        </pre>
      </div>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Anchor
