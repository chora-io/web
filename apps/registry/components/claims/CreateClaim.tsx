'use client'

import { MsgAnchor as Msg } from 'cosmos/api/regen/data/v1/tx'
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
  SelectInput,
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

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)
  const [txError, setTxError] = useState<string | null>(null)
  const [txSuccess, setTxSuccess] = useState<any>(null)

  const [input, setInput] = useState<string>('form')

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
    setSuccess(null)
  }

  const handleSetJson = (value: any) => {
    setJson(value)
    setError(null)
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    if (!wallet) {
      setError('keplr not connected')
      return
    }

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

    await fetch(serverUrl + '/data', {
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

    const bz = blake.blake2b(normalized || '', undefined, 32)

    const contentHash = {
      $type: 'regen.data.v1.ContentHash',
      graph: {
        $type: 'regen.data.v1.ContentHash.Graph',
        hash: Buffer.from(bz).toString('base64'),
        digestAlgorithm: 1, // DIGEST_ALGORITHM_BLAKE2B_256
        canonicalizationAlgorithm: 1, // GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015
        merkleTree: 0, // GRAPH_MERKLE_TREE_NONE_UNSPECIFIED
      },
    }

    const msg = {
      sender: wallet.bech32Address,
      contentHash: contentHash,
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/regen.data.v1.MsgAnchor',
      value: Msg.encode(msg).finish(),
    }

    // sign and broadcast message to selected network
    await signAndBroadcast(chainInfo, wallet.bech32Address, [msgAny])
      .then((res) => {
        setTxSuccess(res)
      })
      .catch((err) => {
        if (err.message === "Cannot read properties of null (reading 'key')") {
          setTxError('keplr account does not exist on the selected network')
        } else {
          setTxError(err.message)
        }
      })
  }

  return (
    <div className={styles.box}>
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
          <button type="submit">{'post and anchor'}</button>
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
          <button type="submit">{'post and anchor'}</button>
        </form>
      )}
      <Result error={error} success={success} />
      <ResultTx error={txError} rest={chainInfo?.rest} success={txSuccess} />
    </div>
  )
}

export default CreateClaim
