'use client'

import { MsgCreateBatch as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import { ResultTx } from 'chora/components'
import {
  InputJSON,
  InputsFromJSON,
  InputTimestamp,
  SelectStorage,
} from 'chora/components/forms'
import {
  InputIssuances,
  SelectProject,
} from 'chora/components/forms/regen.ecocredit.v1'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer } from 'chora/hooks'
import { signAndBroadcast } from 'chora/utils'
import * as jsonld from 'jsonld'
import { useContext, useEffect, useState } from 'react'

import { usePermissionsIssuer } from '@hooks/usePermissionsIssuer'
import { useProjects } from '@hooks/useProjects'

import styles from './CreateBatch.module.css'

const contextUrl = 'https://schema.chora.io/contexts/ecocredit_batch.jsonld'

const CreateBatch = () => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  const [projects] = useProjects(chainInfo, 0, 0) // TODO: error

  const [context, setContext] = useState<string>('')
  const [example, setExample] = useState<string>('')
  const [template, setTemplate] = useState<string>('')

  // input option
  const [input, setInput] = useState<string>('schema-form')

  // form inputs
  const [json, setJson] = useState<string>('')

  // data storage
  const [dataStorage, setDataStorage] = useState<string>('json')

  const [projectId, setProjectId] = useState<string>('')
  const [issuance, setIssuance] = useState<any[]>([])
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  // NOTE: must come after class id form input state is declared
  const [isIssuer, isAuthz, isLoading] = usePermissionsIssuer(
    wallet,
    projectId ? projectId.split('-')[0] : '',
    '/regen.ecocredit.v1.MsgCreateBatch',
  )

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

    // handle data storage json
    if (dataStorage === 'json') {
      metadata = json
    }

    // handle data storage iri
    if (dataStorage === 'server') {
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
      issuer: wallet.bech32Address,
      projectId: projectId,
      issuance: issuance,
      metadata: metadata,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/regen.ecocredit.v1.MsgCreateBatch',
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
    <div id="msg-create-batch" className={styles.box}>
      <div className={styles.boxOptions}>
        <span style={{ fontSize: '0.9em', marginRight: '1.5em', opacity: 0.5 }}>
          <b>{!projectId || isLoading ? '?' : isIssuer ? '✓' : 'x'}</b>
          <span style={{ marginLeft: '0.5em' }}>{'class issuer'}</span>
        </span>
        <span style={{ fontSize: '0.9em', marginRight: '1.5em', opacity: 0.5 }}>
          <b>{isAuthz ? '✓' : 'x'}</b>
          <span style={{ marginLeft: '0.5em' }}>{'authz grantee'}</span>
        </span>
      </div>
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
        <SelectProject
          id="msg-create-batch-project-id"
          options={projects}
          selected={projectId}
          setSelected={setProjectId}
        />
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
        <InputIssuances
          id="msg-create-batch-issuance"
          label="issuance"
          issuances={issuance}
          setIssuances={setIssuance}
        />
        <InputTimestamp
          id="msg-create-batch-start-date"
          label="start date"
          timestamp={startDate}
          setTimestamp={setStartDate}
        />
        <InputTimestamp
          id="msg-create-batch-end-date"
          label="end date"
          timestamp={endDate}
          setTimestamp={setEndDate}
        />
        <hr />
        <SelectStorage
          network={network}
          dataStorage={dataStorage}
          setDataStorage={setDataStorage}
        />
        <button type="submit">{'submit'}</button>
      </form>
      <ResultTx error={error} rest={chainInfo?.rest} success={success} />
    </div>
  )
}

export default CreateBatch
