'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useAnchor } from '@hooks/useAnchor'

import styles from './Anchor.module.css'

const Anchor = () => {
  const { iri } = useParams()

  const { chainInfo } = useContext(WalletContext)

  const [anchor, anchorError] = useAnchor(chainInfo, `${iri}`)

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'iri'}</h3>
        <p>{iri ? iri.toString().replace('%3A', ':') : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'timestamp'}</h3>
        <p>{anchor ? anchor['timestamp'] : 'NA'}</p>
      </div>
      {anchorError && (
        <div className={styles.boxText}>
          <Result error={anchorError} />
        </div>
      )}
      <hr />
      {anchor && (
        <div className={styles.boxText}>
          <h3>{'data stored on blockchain network'}</h3>
          <pre>
            <p>{JSON.stringify(anchor, null, ' ')}</p>
          </pre>
        </div>
      )}
    </div>
  )
}

export default Anchor
