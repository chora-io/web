import { useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

const queryPolicy = 'cosmos/group/v1/group_policy_info'

// fetch policy and policy metadata from selected network and network server
export const useGroupPolicy = (chainInfo: any, address: string) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [policy, setPolicy] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // reset state on network, server, or address change
  useEffect(() => {
    setError(null)
    setPolicy(null)
    setMetadata(null)
  }, [chainInfo?.chainId, serverUrl, address])

  // fetch on load and network or address change
  useEffect(() => {
    // fetch policy from selected network
    const fetchPolicy = async () => {
      // fetch policy from selected network
      await fetch(chainInfo.rest + '/' + queryPolicy + '/' + address)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setPolicy(res.info)
          }
        })
    }

    // only fetch if network and address
    if (chainInfo?.rest && address) {
      fetchPolicy().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, address])

  // fetch on load and server or policy metadata change
  useEffect(() => {
    // fetch policy metadata from network server
    const fetchMetadata = async () => {
      // handle metadata as json, otherwise chora server iri
      try {
        // parse policy metadata
        const parsedMetadata = JSON.parse(policy.metadata)
        setMetadata(parsedMetadata)
      } catch (e) {
        // do nothing with error

        // fetch policy metadata from network server
        await fetch(serverUrl + '/data/' + policy.metadata)
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
                setError(`unsupported metadata schema: ${data['@context']}`)
              } else {
                setMetadata(data)
              }
            }
          })
          .catch((err) => {
            setError(err.message)
          })
      }
    }

    // only fetch if server and policy metadata
    if (serverUrl && policy?.metadata) {
      fetchMetadata().catch((err) => {
        setError(err.message)
      })
    }
  }, [serverUrl, policy?.metadata])

  return [policy, metadata, error]
}
