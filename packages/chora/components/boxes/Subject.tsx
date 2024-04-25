'use client'

import * as React from 'react'
import { useContext } from 'react'

import { Result } from '..'
import { WalletContext } from '../../contexts'

import styles from './Subject.module.css'

const Subject = ({ subject, metadata, error, renderAddress }: any) => {
  const { wallet } = useContext(WalletContext)

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
        {subject && renderAddress ? (
          <p>{renderAddress(subject.curator)}</p>
        ) : (
          <p>
            {subject?.curator || 'NA'}
            {wallet && subject?.curator === wallet.bech32Address && (
              <span className={styles.activeAccount}>{'(active account)'}</span>
            )}
          </p>
        )}
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

export default Subject
