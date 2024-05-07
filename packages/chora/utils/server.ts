import * as jsonld from 'jsonld'

// postToServer posts a JSON-LD document to network server
export const postToServer = async (
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

  // set post request body
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
