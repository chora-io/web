import * as jsonld from 'jsonld'

// postToServer posts a JSON-LD document to network server
export const postToServer = async (
  parsed: any,
  network: string,
  serverUrl: string,
  storage: string,
) => {
  let cid: string | undefined

  // check and normalize JSON-LD document
  const normalized = await jsonld
    .normalize(parsed, {
      algorithm: 'URDNA2015',
      format: 'application/n-quads',
    })
    .catch((err) => {
      throw err.message
    })

  // return error if empty
  if (normalized == '') {
    throw 'JSON-LD empty after normalized'
  }

  let body: any = {}
  let postUrl: string = ''

  // set ipfs post request body
  if (storage === 'ipfs') {
    body = {
      content: JSON.stringify(parsed),
    }
    postUrl = '/ipfs'
  }

  // set data post request body
  if (storage === 'server') {
    body = {
      canon: 'URDNA2015',
      context: 'https://schema.chora.io/contexts/group.jsonld',
      digest: 'BLAKE2B_256',
      jsonld: JSON.stringify(parsed),
      merkle: 'UNSPECIFIED',
    }
    postUrl = '/data'
  }

  // post data to network server
  await fetch(serverUrl + postUrl, {
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.code) {
        throw data.message
      } else {
        if (storage === 'ipfs') {
          cid = data.cid
        }
        if (storage === 'server') {
          cid = network.includes('chora')
            ? data.iri
            : network.split('-')[0] + ':' + data.iri.split(':')[1]
        }
      }
    })
    .catch((err) => {
      throw err.message
    })

  // return error if cid never set
  if (typeof cid === 'undefined') {
    throw 'cid is undefined'
  }

  return cid
}
