import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'

import { WalletContext } from 'chora'
import { Result } from 'chora/components'
import { useNetworkCoop, useNetworkServer } from 'chora/hooks'

import styles from './Geonode.module.css'

const queryNode = 'chora/geonode/v1/node'
const queryPolicy = 'cosmos/group/v1/group_policy_info'

const Geonode = ({ nodeId }: any) => {
  const { chainInfo } = useContext(WalletContext)

  const [groupId] = useNetworkCoop(chainInfo)
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | undefined>(undefined)
  const [node, setNode] = useState<any>(undefined)
  const [metadata, setMetadata] = useState<any>(undefined)
  const [curator, setCurator] = useState<any>(undefined)

  // reset state on node or network change
  useEffect(() => {
    setError(undefined)
    setNode(undefined)
    setMetadata(undefined)
    setCurator(undefined)
  }, [nodeId, chainInfo?.chainId])

  // fetch on load and node or group change
  useEffect(() => {
    // fetch node and metadata from selected network
    if (groupId) {
      fetchNode().catch((err) => {
        setError(err.message)
      })
    }
  }, [nodeId, groupId])

  // fetch on load and group or node curator change
  useEffect(() => {
    // fetch node metadata from network server
    if (groupId && node?.metadata) {
      fetchNodeMetadata().catch((err) => {
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

  // fetch node from selected network
  const fetchNode = async () => {
    // fetch node from selected network
    await fetch(chainInfo.rest + '/' + queryNode + '/' + nodeId)
      .then((res) => res.json())
      .then((res) => {
        if (res.code) {
          setError(res.message)
        } else {
          setNode(res)
        }
      })
  }

  // fetch node metadata from network server
  const fetchNodeMetadata = async () => {
    // fetch node metadata from network server
    await fetch(serverUrl + '/data/' + node.metadata)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(res.error)
        } else {
          const data = JSON.parse(res['jsonld'])
          if (
            data['@context'] !==
            'https://schema.chora.io/contexts/geonode.jsonld'
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

  // fetch node curator from selected network and network server
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
          <p>{node && node['curator'] ? node['curator'] : 'NA'}</p>
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

export default Geonode
