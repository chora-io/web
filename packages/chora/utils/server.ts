import * as jsonld from 'jsonld'

// postData posts a JSON-LD document to network server
export const postData = async (
  parsed: any,
  network: string,
  serverUrl: string,
) => {
  let iri: string | undefined

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

  const body = {
    canon: 'URDNA2015',
    context: 'https://schema.chora.io/contexts/group.jsonld',
    digest: 'BLAKE2B_256',
    jsonld: JSON.stringify(parsed),
    merkle: 'UNSPECIFIED',
  }

  // post data to network server
  await fetch(serverUrl + '/data', {
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.code) {
        throw data.message
      } else {
        iri = network.includes('chora')
          ? data.iri
          : network.split('-')[0] + ':' + data.iri.split(':')[1]
      }
    })
    .catch((err) => {
      throw err.message
    })

  // return error if iri never set
  if (typeof iri === 'undefined') {
    throw 'iri is undefined'
  }

  return iri
}

// postIpfs posts a JSON-LD document to ipfs network (via network server)
export const postIpfs = async (
  parsed: any,
  network: string,
  serverUrl: string,
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

  const body = {
    content: JSON.stringify(parsed),
  }

  // post data to network server
  await fetch(serverUrl + '/ipfs', {
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.code) {
        throw data.message
      } else {
        cid = data.cid
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
