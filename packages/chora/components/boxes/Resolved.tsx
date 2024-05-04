'use client'

import * as React from 'react'

import { Result } from '..'

import styles from './Resolved.module.css'

const Resolved = ({ iri, metadata, resolverUrl, error }: any) => {
  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'iri'}</h3>
        <p>{iri || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'resolver url'}</h3>
        <p>{resolverUrl || 'NA'}</p>
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
      <Result error={error} />
    </div>
  )
}

export default Resolved
