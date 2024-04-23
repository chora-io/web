'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useVoucher } from '@hooks/useVoucher'

import styles from './Voucher.module.css'

const Voucher = () => {
  const { id } = useParams()
  const { chainInfo, network } = useContext(WalletContext)

  // fetch voucher from selected network
  const [voucher, voucherError] = useVoucher(chainInfo, `${id}`)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    voucher ? voucher.metadata : null,
  )

  const error = voucherError || metadataError

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'id'}</h3>
        <p>{id ? id : 'NA'}</p>
      </div>
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
        <h3>{'issuer'}</h3>
        <p>{voucher && voucher['issuer'] ? voucher['issuer'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'metadata'}</h3>
        {error ? (
          <p>{voucher ? voucher.metadata : 'NA'}</p>
        ) : (
          <p>
            {voucher && voucher.metadata ? (
              <Link href={`/${network}/claims/${voucher.metadata}`}>
                {voucher.metadata}
              </Link>
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
          <p>{JSON.stringify(voucher, null, ' ')}</p>
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

export default Voucher
