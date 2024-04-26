'use client'

import { MsgCreate as Msg } from 'cosmos/api/chora/content/v1/msg'
import { ResultTx } from 'chora/components'
import {
  InputJSON,
  InputsFromJSON,
  SelectMetadataFormat,
} from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer } from 'chora/hooks'
import { signAndBroadcast } from 'chora/utils'
import * as jsonld from 'jsonld'
import { useContext, useEffect, useState } from 'react'

import styles from './CreateVoucher.module.css'

const contextUrl = 'https://schema.chora.io/contexts/voucher.jsonld'

const CreateVoucher = () => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  const [context, setContext] = useState<string>('')
  const [example, setExample] = useState<string>('')
  const [template, setTemplate] = useState<string>('')

  // input option
  const [input, setInput] = useState<string>('schema-form')

  // form inputs
  const [json, setJson] = useState<string>('')

  // metadata format
  const [metadataFormat, setMetadataFormat] = useState<string>('json')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  useEffect(() => {
    // fetch schema context
    fetch(contextUrl)
      .then((res) => res.json())
      .then((data) => {
        setContext(JSON.stringify(data, null, '  '))
      })
      .catch((err) => {
        setContext(err.message)
      })

    // fetch schema example
    fetch(contextUrl.replace('contexts', 'examples'))
      .then((res) => res.json())
      .then((data) => {
        setExample(JSON.stringify(data, null, '  '))
      })
      .catch((err) => {
        setExample(err.message)
      })

    // fetch schema template
    fetch(contextUrl.replace('contexts', 'templates'))
      .then((res) => res.json())
      .then((data) => {
        setTemplate(JSON.stringify(data, null, '  '))
      })
      .catch((err) => {
        setTemplate(err.message)
      })
  }, [])

  const handleGenJson = (event: any) => {
    event.preventDefault()

    setJson(template)
    setError(null)
  }

  const handleSetInput = (input: string) => {
    setInput(input)
    setError(null)
  }

  const handleSetJson = (value: any) => {
    setJson(value)
    setError(null)
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    let metadata: string = ''

    // handle metadata format json
    if (metadataFormat === 'json') {
      metadata = json
    }

    // handle metadata format iri
    if (metadataFormat === 'iri') {
      // check and parse JSON
      let doc: any
      try {
        doc = JSON.parse(json)
      } catch (err) {
        setError('invalid json')
        return
      }

      // check and normalize JSON-LD document
      const normalized = await jsonld
        .normalize(doc, {
          algorithm: 'URDNA2015',
          format: 'application/n-quads',
        })
        .catch((err) => {
          setError(err.message)
          return
        })

      // return error if empty
      if (normalized == '') {
        setError('JSON-LD empty after normalized')
        return
      }

      // set post request body
      const body = {
        canon: 'URDNA2015',
        context: 'https://schema.chora.io/contexts/voucher.jsonld',
        digest: 'BLAKE2B_256',
        jsonld: json,
        merkle: 'UNSPECIFIED',
      }

      let iri: string | undefined

      // post data to network server
      await fetch(serverUrl + '/data', {
        method: 'POST',
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code) {
            setError(data.message)
          } else {
            iri = network.includes('chora')
              ? data['iri']
              : network.split('-')[0] + ':' + data['iri'].split(':')[1]
          }
        })
        .catch((err) => {
          setError(err.message)
        })

      // return error if iri never set
      if (typeof iri === 'undefined') {
        return
      }

      metadata = iri
    }

    const msg = {
      curator: wallet?.bech32Address,
      metadata: metadata,
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/chora.voucher.v1.MsgCreate',
      value: Msg.encode(msg).finish(),
    }

    await signAndBroadcast(chainInfo, wallet['bech32Address'], [msgAny])
      .then((res) => {
        setSuccess(res)
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <div id="msg-create-voucher" className={styles.box}>
      <div className={styles.boxOptions}>
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
      <form className={styles.form} onSubmit={handleSubmit}>
        {input === 'schema-form' && (
          <InputsFromJSON example={example} json={json} setJson={setJson} />
        )}
        {input === 'schema-json' && (
          <InputJSON
            label="metadata"
            json={json}
            placeholder={example}
            setJson={handleSetJson}
            useTemplate={handleGenJson}
            showUseTemplate={context.length > 0}
          />
        )}
        <hr />
        <SelectMetadataFormat
          network={network}
          metadataFormat={metadataFormat}
          setMetadataFormat={setMetadataFormat}
        />
        <button type="submit">{'submit'}</button>
      </form>
      <ResultTx error={error} rest={chainInfo?.rest} success={success} />
    </div>
  )
}

export default CreateVoucher
