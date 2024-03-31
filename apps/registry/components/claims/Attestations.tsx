'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { formatTimestamp } from 'chora/utils'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useAttestations } from '@hooks/useAttestations'

import styles from './Attestations.module.css'

const Attestations = () => {
  const { iri } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch data attestations from selected network
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
          <div className={styles.boxItem} key={attestation['attestor']}>
            <div className={styles.boxText}>
              <h3>{'attestor'}</h3>
              <p>{attestation ? attestation['attestor'] : 'NA'}</p>
            </div>
            <div className={styles.boxText}>
              <h3>{'timestamp'}</h3>
              <p>
                {attestation ? formatTimestamp(attestation['timestamp']) : 'NA'}
              </p>
            </div>
          </div>
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
