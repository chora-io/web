import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'

import { WalletContext } from 'chora'
import { Result } from 'chora/components'
import { useNetworkCoop, useNetworkServer } from 'chora/hooks'

import styles from './Voucher.module.css'

const queryPolicy = 'cosmos/group/v1/group_policy_info'
const queryVoucher = 'chora/voucher/v1/voucher'

const Voucher = ({ voucherId }: any) => {
  const { chainInfo, network } = useContext(WalletContext)

  const [groupId] = useNetworkCoop(chainInfo)
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | undefined>(undefined)
  const [voucher, setVoucher] = useState<any>(undefined)
  const [metadata, setMetadata] = useState<any>(undefined)
  const [issuer, setIssuer] = useState<any>(undefined)

  // reset state on voucher or network change
  useEffect(() => {
    setError(undefined)
    setVoucher(undefined)
    setMetadata(undefined)
    setIssuer(undefined)
  }, [voucherId, chainInfo?.chainId])

  // fetch on load and voucher or group change
  useEffect(() => {
    // fetch voucher and metadata from selected network
    if (groupId) {
      fetchVoucher().catch((err) => {
        setError(err.message)
      })
    }
  }, [voucherId, groupId])

  // fetch on load and group or node curator change
  useEffect(() => {
    // fetch voucher metadata from network server
    if (groupId && voucher?.metadata) {
      fetchVoucherMetadata().catch((err) => {
        setError(err.message)
      })
    }
  }, [groupId, voucher?.metadata])

  // fetch on load and group or node curator change
  useEffect(() => {
    // fetch voucher issuer from selected network and network server
    if (groupId && voucher?.issuer) {
      fetchVoucherIssuer().catch((err) => {
        setError(err.message)
      })
    }
  }, [groupId, voucher?.issuer])

  // fetch voucher from selected network
  const fetchVoucher = async () => {
    // fetch voucher from selected network
    await fetch(chainInfo.rest + '/' + queryVoucher + '/' + voucherId)
      .then((res) => res.json())
      .then((res) => {
        if (res.code) {
          setError(res.message)
        } else {
          setVoucher(res)
        }
      })
  }

  // fetch voucher metadata from network server
  const fetchVoucherMetadata = async () => {
    // fetch voucher metadata from network server
    await fetch(serverUrl + '/data/' + voucher.metadata)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(res.error)
        } else {
          const data = JSON.parse(res['jsonld'])
          if (
            data['@context'] !==
            'https://schema.chora.io/contexts/voucher.jsonld'
          ) {
            setError('unsupported metadata schema')
          } else {
            setMetadata(data)
          }
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  // fetch voucher issuer from selected network and network server
  const fetchVoucherIssuer = async () => {
    let iri: string | undefined

    // fetch policy from selected network
    await fetch(chainInfo.rest + '/' + queryPolicy + '/' + voucher['issuer'])
      .then((res) => res.json())
      .then((res) => {
        if (res.code) {
          setError(res.message)
        } else {
          iri = res['info']['metadata']
        }
      })

    // fetch member metadata from network server
    await fetch(serverUrl + '/data/' + iri)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(res.error)
        } else {
          const data = JSON.parse(res['jsonld'])
          if (
            data['@context'] !==
            'https://schema.chora.io/contexts/group_policy.jsonld'
          ) {
            setError('unsupported metadata schema')
          } else {
            setError('')
            setIssuer({
              address: voucher['issuer'],
              name: data['name'],
            })
          }
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }

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
        <h3>{'issuer'}</h3>
        {issuer ? (
          <p>
            {`${issuer['name']} (`}
            <Link href={`/policies/${issuer['address']}`}>
              {issuer['address']}
            </Link>
            {')'}
          </p>
        ) : (
          <p>{voucher && voucher['issuer']}</p>
        )}
      </div>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Voucher
