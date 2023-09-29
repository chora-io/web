import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'

import { WalletContext } from 'chora'
import { useNetworkCoop, useNetworkServer } from 'chora/hooks'

import styles from './ProposalPreview.module.css'

const ProposalPreview = ({ proposal }: any) => {
  const { chainInfo } = useContext(WalletContext)

  const [groupId] = useNetworkCoop(chainInfo)
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | undefined>(undefined)
  const [metadata, setMetadata] = useState<any>(undefined)

  // reset state on proposal or network change
  useEffect(() => {
    setError(undefined)
    setMetadata(undefined)
  }, [proposal, chainInfo?.chainId])

  // fetch on load and group or metadata change
  useEffect(() => {
    // fetch proposal metadata from network server
    if (groupId && proposal?.metadata) {
      fetchMetadata().catch((err) => {
        setError(err.message)
      })
    }
  }, [groupId, proposal?.metadata])

  // fetch proposal metadata from network server
  const fetchMetadata = async () => {
    // fetch proposal metadata from network server
    await fetch(serverUrl + '/data/' + proposal['metadata'])
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(res.error)
          setMetadata(null)
        } else {
          const data = JSON.parse(res['jsonld'])
          if (
            data['@context'] !==
            'https://schema.chora.io/contexts/group_proposal.jsonld'
          ) {
            setError('unsupported metadata schema')
            setMetadata(null)
          } else {
            setError('')
            setMetadata(data)
          }
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <div className={styles.boxItem}>
      {!proposal && !metadata && !error && <div>{'loading...'}</div>}
      {proposal && metadata && (
        <div>
          <div className={styles.boxText}>
            <h3>{'name'}</h3>
            <p>{metadata['name'] ? metadata['name'] : 'NA'}</p>
          </div>
          <div className={styles.boxText}>
            <h3>{'status'}</h3>
            <p>{proposal['status']}</p>
          </div>
          {proposal['status'] === 'PROPOSAL_STATUS_ACCEPTED' && (
            <div className={styles.boxText}>
              <h3>{'executor result'}</h3>
              <p>{proposal['executor_result']}</p>
            </div>
          )}
          <Link href={`/proposals/${proposal['id']}`}>{'view proposal'}</Link>
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  )
}

export default ProposalPreview
