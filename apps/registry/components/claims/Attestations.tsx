'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useAttestations } from '@hooks/useAttestations'

import styles from './Attestations.module.css'

const Attestations = () => {
  const { iri } = useParams()

  const { chainInfo } = useContext(WalletContext)

  const [attestations, error] = useAttestations(chainInfo, `${iri}`)

  return (
    <div className={styles.box}>
      {!attestations ||
        (attestations.length === 0 && (
          <div className={styles.boxText}>
            <p>{'No attestation records found.'}</p>
          </div>
        ))}
      {attestations &&
        attestations.map((attestation: any) => (
          <>
            <div className={styles.boxText}>
              <h3>{'attestor'}</h3>
              <p>{attestation ? attestation['attestor'] : 'NA'}</p>
            </div>
            <div className={styles.boxText}>
              <h3>{'timestamp'}</h3>
              <p>{attestation ? attestation['timestamp'] : 'NA'}</p>
            </div>
            <hr />
          </>
        ))}
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Attestations
