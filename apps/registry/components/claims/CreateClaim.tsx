'use client'

import { MsgAttest as Msg } from 'cosmos/api/regen/data/v1/tx'
import { ContentHash_Graph } from 'cosmos/api/regen/data/v1/types'
import {
  SelectDigestAlgorithm,
  SelectGraphCanon,
  SelectGraphMerkle,
} from 'chora/components/regen.data.v1'
import {
  InputJSON,
  InputsFromJSON,
  Result,
  ResultTx,
  SelectContext,
} from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer } from 'chora/hooks'
import { signAndBroadcast } from 'chora/utils'
import * as blake from 'blakejs'
import { Buffer } from 'buffer'
import * as jsonld from 'jsonld'
import { useContext, useEffect, useState } from 'react'

import styles from './CreateClaim.module.css'

const contextUrl = 'https://schema.chora.io/contexts/index.jsonld'
const convertHashToIri = '/regen/data/v1/convert-hash-to-iri'

const CreateClaim = () => {
  const { chainInfo, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  // data schema
  const [context, setContext] = useState<string>('')
  const [contexts, setContexts] = useState<string[]>([])
  const [example, setExample] = useState<string>('')
  const [template, setTemplate] = useState<string>('')

  // json input
  const [json, setJson] = useState<string>('')

  // error and results
  const [error, setError] = useState<string | null>(null)
  const [contentHash, setContentHash] = useState<any>(null)
  const [iri, setIri] = useState<string>('')
  const [txSuccess, setTxSuccess] = useState<any>(null)

  const [input, setInput] = useState<string>('custom-json')

  useEffect(() => {
    // fetch available schemas
    fetch(contextUrl)
      .then((res) => res.json())
      .then((data) => {
        const urls: string[] = []
        data['itemListElement'].map((e: any) => urls.push(e.item['@id']))
        setContexts(urls)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [contexts.length])

  const handleGenJson = (event: any) => {
    event.preventDefault()

    setJson(template)
    setError(null)
  }

  const handleSetContext = (event: any) => {
    event.preventDefault()

    setContext(event.target.value)
    setJson('')
    setError(null)

    if (event.target.value !== '') {
      // fetch schema example
      fetch(event.target.value.replace('contexts', 'examples'))
        .then((res) => res.json())
        .then((data) => {
          setExample(JSON.stringify(data, null, '  '))
        })
        .catch((err) => {
          setExample(err.message)
        })

      // fetch schema template
      fetch(event.target.value.replace('contexts', 'templates'))
        .then((res) => res.json())
        .then((data) => {
          setTemplate(JSON.stringify(data, null, '  '))
        })
        .catch((err) => {
          setTemplate(err.message)
        })
    } else {
      setExample('')
      setTemplate('')
    }
  }

  const handleSetInput = (input: string) => {
    setInput(input)
    setError(null)
  }

  const handleSetJson = (value: any) => {
    setJson(value)
    setError(null)
  }

  const handleSubmitGenerate = async (event: {
    preventDefault: () => void
  }) => {
    event.preventDefault()

    setError(null)

    // check and parse JSON
    let doc: any
    try {
      doc = JSON.parse(json)
    } catch (err) {
      setError('invalid json')
      return
    }

    // check and normalize JSON-LD
    const normalized = await jsonld
      .normalize(doc, {
        algorithm: 'URDNA2015',
        format: 'application/n-quads',
      })
      .catch((err) => {
        setError(err.message)
        return
      })

    if (normalized == '') {
      setError('JSON-LD empty after normalized')
      return
    }

    // generate blake2b hash bytes
    const bz = blake.blake2b(normalized || '', undefined, 32)

    // generate base64 encoded string
    const hash = Buffer.from(bz).toString('base64')

    setContentHash({
      graph: {
        hash: hash,
        digestAlgorithm: 'DIGEST_ALGORITHM_BLAKE2B_256',
        canonicalizationAlgorithm: 'GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015',
        merkleTree: 'GRAPH_MERKLE_TREE_NONE_UNSPECIFIED',
      },
    })
  }

  const handleSubmitConvert = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)

    await fetch(chainInfo.rest + convertHashToIri, {
      method: 'POST',
      body: JSON.stringify({ contentHash }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code) {
          setError(data.message)
        } else {
          setIri(data.iri)
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  const handleSubmitServer = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)

    const body = {
      canon: 'URDNA2015',
      digest: 'BLAKE2B_256',
      jsonld: json,
      merkle: 'UNSPECIFIED',
    }

    await fetch(serverUrl + '/data', {
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code) {
          setError(data.message)
        } else {
          setIri(data.iri)
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  const handleSubmitAnchorAndAttest = async (event: {
    preventDefault: () => void
  }) => {
    event.preventDefault()

    setError(null)

    if (!wallet) {
      setError('keplr not connected')
      return
    }

    const msg = {
      attestor: wallet.bech32Address,
      contentHashes: [ContentHash_Graph.fromJSON(contentHash.graph)],
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/regen.data.v1.MsgAttest',
      value: Msg.encode(msg).finish(),
    }

    // sign and broadcast message to selected network
    await signAndBroadcast(chainInfo, wallet.bech32Address, [msgAny])
      .then((res) => {
        setTxSuccess(res)
      })
      .catch((err) => {
        if (err.message === "Cannot read properties of null (reading 'key')") {
          setError('keplr account does not exist on the selected network')
        } else {
          setError(err.message)
        }
      })
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxOptions}>
        <button
          className={
            input == 'custom-json' ? styles.boxOptionActive : undefined
          }
          onClick={() => handleSetInput('custom-json')}
        >
          {'custom json'}
        </button>
        <button
          className={
            input == 'schema-form' ? styles.boxOptionActive : undefined
          }
          onClick={() => handleSetInput('schema-form')}
        >
          {'schema form'}
        </button>
        <button
          className={
            input == 'schema-json' ? styles.boxOptionActive : undefined
          }
          onClick={() => handleSetInput('schema-json')}
        >
          {'schema json'}
        </button>
      </div>
      <form className={styles.form}>
        {input === 'custom-json' && (
          <InputJSON
            json={json}
            placeholder={example}
            setJson={handleSetJson}
          />
        )}
        {input === 'schema-form' && (
          <>
            <SelectContext
              context={context}
              contexts={contexts}
              setContext={handleSetContext}
            />
            <InputsFromJSON example={example} json={json} setJson={setJson} />
          </>
        )}
        {input === 'schema-json' && (
          <>
            <SelectContext
              context={context}
              contexts={contexts}
              setContext={handleSetContext}
            />
            <InputJSON
              json={json}
              placeholder={example}
              setJson={handleSetJson}
              useTemplate={handleGenJson}
              showUseTemplate={context.length > 0}
            />
          </>
        )}
        <SelectDigestAlgorithm
          digest={''} // disabled until multiple options exist
          setDigest={() => {}} // disabled until multiple options exist
        />
        <SelectGraphCanon
          canon={''} // disabled until multiple options exist
          setCanon={() => {}} // disabled until multiple options exist
        />
        <SelectGraphMerkle
          merkle={''} // disabled until multiple options exist
          setMerkle={() => {}} // disabled until multiple options exist
        />
      </form>
      <button
        className={!json ? styles.buttonDisabled : styles.button}
        onClick={handleSubmitGenerate}
        disabled={!json}
      >
        {'generate hash'}
      </button>
      <button
        className={!contentHash ? styles.buttonDisabled : styles.button}
        onClick={handleSubmitConvert}
        disabled={!contentHash}
      >
        {'convert to iri'}
      </button>
      <button
        className={!json ? styles.buttonDisabled : styles.button}
        onClick={handleSubmitServer}
        disabled={!json}
      >
        {'post to server'}
      </button>
      <button
        className={!contentHash ? styles.buttonDisabled : styles.button}
        onClick={handleSubmitAnchorAndAttest}
        disabled={!contentHash}
      >
        {'anchor and attest'}
      </button>
      <div className={styles.boxText}>
        <Result error={error} />
      </div>
      <div className={styles.boxText}>
        {contentHash && (
          <Result success={JSON.stringify(contentHash, null, '  ')} />
        )}
      </div>
      <div className={styles.boxText}>{iri && <Result success={iri} />}</div>
      <div className={styles.boxText}>
        <ResultTx rest={chainInfo?.rest} success={txSuccess} />
      </div>
    </div>
  )
}

export default CreateClaim
