import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'

import { WalletContext } from 'chora'
import { Result } from 'chora/components'
import { useNetworkCoop, useNetworkServer } from 'chora/hooks'

import styles from './GeonodePreview.module.css'

const queryPolicy = 'cosmos/group/v1/group_policy_info'

const GeonodePreview = ({ node }: any) => {
  const { chainInfo, network } = useContext(WalletContext)

  const [groupId] = useNetworkCoop(chainInfo)
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | undefined>(undefined)
  const [metadata, setMetadata] = useState<any>(undefined)
  const [curator, setCurator] = useState<any>(undefined)

  // reset state on node or network change
  useEffect(() => {
    setError(undefined)
    setMetadata(undefined)
    setCurator(undefined)
  }, [node, chainInfo?.chainId])

  // fetch on load and group or node metadata change
  useEffect(() => {
    // fetch node metadata from network server
    if (groupId && node?.metadata) {
      fetchMetadata().catch((err) => {
        setError(err.message)
      })
    }
  }, [groupId, node?.metadata])

  // fetch on load and group or node curator change
  useEffect(() => {
    // fetch node curator from selected network and network server
    if (groupId && node?.curator) {
      fetchNodeCurator().catch((err) => {
        setError(err.message)
      })
    }
  }, [groupId, node?.curator])

  // fetch metadata from network server
  const fetchMetadata = async () => {
    // fetch node metadata from network server
    await fetch(serverUrl + '/data/' + node['metadata'])
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(res.error)
          setMetadata(null)
        } else {
          const data = JSON.parse(res['jsonld'])
          if (
            data['@context'] !==
            'https://schema.chora.io/contexts/geonode.jsonld'
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

  // fetch geonode curator from selected network and network server
  const fetchNodeCurator = async () => {
    let iri: string | undefined

    // fetch policy from selected network
    await fetch(chainInfo.rest + '/' + queryPolicy + '/' + node['curator'])
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
            setCurator({
              address: node['curator'],
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
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'name'}</h3>
        <p>{metadata && metadata['name'] ? metadata['name'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'curator'}</h3>
        {curator ? (
          <p>
            {`${curator['name']} (`}
            <Link href={`/policies/?address=${curator['address']}`}>
              {curator['address']}
            </Link>
            {')'}
          </p>
        ) : (
          <p>{node['curator']}</p>
        )}
      </div>
      <Link href={`/geonodes/?id=${node['id']}`}>{'view node'}</Link>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default GeonodePreview
