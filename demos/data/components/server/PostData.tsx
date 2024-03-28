'use client'

import {
  InputJSON,
  InputsFromJSON,
  Result,
  SelectContext,
  SelectInput,
} from 'chora/components'
import {
  SelectDigestAlgorithm,
  SelectGraphCanon,
  SelectGraphMerkle,
} from 'chora/components/regen.data.v1'
import { WalletContext } from 'chora/contexts'
import * as jsonld from 'jsonld'
import { useContext, useEffect, useState } from 'react'

import styles from './PostData.module.css'

const contextUrl = 'https://schema.chora.io/contexts/index.jsonld'

const PostData = () => {
  const { network } = useContext(WalletContext)

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

  // TODO: add hook for server url

  // whether network is a local network
  const localChain = network?.includes('-local')

  // chora server (use local server if local network)
  let serverUrl = 'http://localhost:3000'
  if (!localChain) {
    serverUrl = 'https://server.chora.io'
  }

  // fetch available contexts
  useEffect(() => {
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

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

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

    const body = {
      canon: 'URDNA2015',
      context: context,
      digest: 'BLAKE2B_256',
      jsonld: json,
      merkle: 'UNSPECIFIED',
    }

    fetch(serverUrl + '/data', {
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code) {
          setError(data.message)
        } else {
          setSuccess(JSON.stringify(data, null, '  '))
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
        <h2>{'post data'}</h2>
        <p>{'post data to chora server and generate iri'}</p>
      </div>
      <SelectInput input={input} setInput={handleSetInput} />
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
          <button type="submit">{'post data'}</button>
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
            showUseTemplate={context.length > 0}
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
          <button type="submit">{'post data'}</button>
        </form>
      )}
      <Result error={error} success={success} />
    </div>
  )
}

export default PostData
