import { useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

const queryProject = 'regen/ecocredit/v1/project'

// fetch project and project metadata from selected network and network server
export const useProject = (chainInfo: any, id: string) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [project, setProject] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // reset state on network, server, or id change
  useEffect(() => {
    setError(null)
    setProject(null)
    setMetadata(null)
  }, [chainInfo?.chainId, serverUrl, id])

  // fetch on load and network or id change
  useEffect(() => {
    // fetch project by id from selected network
    const fetchProject = async () => {
      await fetch(chainInfo.rest + '/' + queryProject + '/' + id)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setProject(res.project)
          }
        })
    }

    // only fetch if network and id
    if (chainInfo?.rest && id) {
      fetchProject().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, id])

  // // fetch on load and server or project metadata change
  // useEffect(() => {
  //   // fetch project metadata by iri from network server
  //   const fetchMetadata = async () => {
  //     await fetch(serverUrl + '/data/' + project.metadata)
  //       .then((res) => res.json())
  //       .then((res) => {
  //         if (res.error) {
  //           setError(res.error)
  //         } else {
  //           const data = JSON.parse(res['jsonld'])
  //           if (
  //             data['@context'] !==
  //             'https://schema.chora.io/contexts/geoproject.jsonld'
  //           ) {
  //             setError('unsupported metadata schema')
  //           } else {
  //             setMetadata(data)
  //           }
  //         }
  //       })
  //       .catch((err) => {
  //         setError(err.message)
  //       })
  //   }
  //
  //   // only fetch if server and project metadata
  //   if (serverUrl && project?.metadata) {
  //     fetchMetadata().catch((err) => {
  //       setError(err.message)
  //     })
  //   }
  // }, [serverUrl, project?.metadata])

  return [project, metadata, error]
}
