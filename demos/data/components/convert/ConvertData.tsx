'use client'

import { Result } from 'chora/components'
import {
  InputJSON,
  InputsFromJSON,
  SelectContext,
  SelectOptionInput,
} from 'chora/components/forms'
import {
  SelectDigestAlgorithm,
  SelectGraphCanon,
  SelectGraphMerkle,
} from 'chora/components/forms/regen.data.v1'
import { WalletContext } from 'chora/contexts'
import * as blake from 'blakejs'
import { Buffer } from 'buffer'
import * as jsonld from 'jsonld'
import { useContext, useEffect, useState } from 'react'

import styles from './ConvertData.module.css'

const contextUrl = 'https://schema.chora.io/contexts/index.jsonld'
const convertHashToIri = '/regen/data/v1/convert-hash-to-iri'

const ConvertData = () => {
  const { chainInfo } = useContext(WalletContext)

  // input option
  const [input, setInput] = useState('form')

  // data schema
  const [context, setContext] = useState<string>('')
  const [contexts, setContexts] = useState<string[]>([])
  const [example, setExample] = useState<string>('')
  const [template, setTemplate] = useState<string>('')

  // json input
  const [json, setJson] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  useEffect(() => {
    // fetch available schemas
    fetch(contextUrl)
      .then((res) => res.json())
      .then((data) => {
        const urls: string[] = []
        data.itemListElement.map((e: any) => urls.push(e.item['@id']))
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

  const handleSetJson = (value: any) => {
    setJson(value)
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

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    // check and parse JSON
    let doc: any
    try {
      doc = JSON.parse(json)
    } catch (err) {
      setError('invalid json')
      return // do not continue
    }

    // check and normalize object
    const normalized = await jsonld
      .normalize(doc, {
        algorithm: 'URDNA2015',
        format: 'application/n-quads',
      })
      .catch((err) => {
        setError(err.message)
        return // do not continue
      })

    if (normalized == '') {
      setError('JSON-LD empty after normalized')
      return // do not continue
    }

    // generate hash bytes using blake2b
    const bz = blake.blake2b(normalized || '', undefined, 32)

    const contentHash = {
      graph: {
        hash: Buffer.from(bz).toString('base64'),
        digestAlgorithm: 'DIGEST_ALGORITHM_BLAKE2B_256',
        canonicalizationAlgorithm: 'GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015',
        merkleTree: 'GRAPH_MERKLE_TREE_NONE_UNSPECIFIED',
      },
    }

    await fetch(chainInfo.rest + convertHashToIri, {
      method: 'POST',
      body: JSON.stringify({ contentHash }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code) {
          setError(data.message)
        } else {
          setSuccess(
            JSON.stringify(
              {
                iri: data.iri,
                contentHash,
              },
              null,
              '  ',
            ),
          )
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  const handleSetInput = (input: string) => {
    setInput(input)
    setError(null)
    setSuccess(null)
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'convert data'}</h2>
        <p>{'convert data to iri and content hash'}</p>
      </div>
      <SelectOptionInput input={input} setInput={handleSetInput} />
      {input == 'form' ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <SelectContext
            context={context}
            contexts={contexts}
            setContext={handleSetContext}
          />
          <InputsFromJSON example={example} json={json} setJson={setJson} />
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
          <button type="submit">{'convert'}</button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
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
            showUseTemplate={context && context.length > 0}
          />
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
          <button type="submit">{'convert'}</button>
        </form>
      )}
      <Result error={error} success={success} />
    </div>
  )
}

export default ConvertData
