import { useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

const queryVoucher = 'chora/voucher/v1/voucher'

// fetch voucher and voucher metadata from selected network and network server
export const useVoucher = (chainInfo: any, voucherId: string) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [voucher, setVoucher] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // reset state on network, server, or voucher id change
  useEffect(() => {
    setError(null)
    setVoucher(null)
    setMetadata(null)
  }, [chainInfo?.chainId, serverUrl, voucherId])

  // fetch on load and network or voucher id change
  useEffect(() => {
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

    // only fetch if network and voucher id
    if (chainInfo?.rest && voucherId) {
      fetchVoucher().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, voucherId])

  // fetch on load and server or voucher metadata change
  useEffect(() => {
    // fetch voucher metadata from network server
    const fetchMetadata = async () => {
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
              setError(null)
              setMetadata(data)
            }
          }
        })
        .catch((err) => {
          setError(err.message)
        })
    }

    // only fetch if server and voucher metadata
    if (serverUrl && voucher?.metadata) {
      fetchMetadata().catch((err) => {
        setError(err.message)
      })
    }
  }, [serverUrl, voucher?.metadata])

  return [voucher, metadata, error]
}
