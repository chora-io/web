'use client'

import { MsgCreateBatch as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import { ResultTx } from 'chora/components'
import {
  InputJSON,
  InputsFromJSON,
  InputTimestamp,
  SelectOption,
  SelectStorage,
} from 'chora/components/forms'
import {
  InputIssuances,
  SelectProject,
} from 'chora/components/forms/regen.ecocredit.v1'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer, useSchema } from 'chora/hooks'
import { postToServer, signAndBroadcast } from 'chora/utils'
import { useContext, useState } from 'react'

import { usePermissionsIssuer } from '@hooks/usePermissionsIssuer'
import { useProjects } from '@hooks/useProjects'

import styles from './CreateBatch.module.css'

const contextUrl = 'https://schema.chora.io/contexts/ecocredit_batch.jsonld'

const CreateBatch = () => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  const [context, example, template, schemaError] = useSchema(contextUrl)

  const [projects, projectsError] = useProjects(chainInfo, 0, 0)

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
  const [isIssuer, isAuthz, isLoading, permError] = usePermissionsIssuer(
    wallet,
    projectId ? projectId.split('-')[0] : '',
    '/regen.ecocredit.v1.MsgCreateBatch',
  )

  // error fetching initial parameters
  const initError = schemaError || projectsError || permError

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    let metadata: string = ''

    // try to parse JSON
    let parsed: any
    try {
      parsed = JSON.parse(json)
    } catch (err) {
      setError('invalid json')
    }

    // handle data storage json
    if (dataStorage === 'json') {
      delete parsed['@context']
      metadata = parsed
    }

    // handle data storage iri
    if (dataStorage === 'server' && serverUrl) {
      await postToServer(parsed, network, serverUrl)
        .then((res) => {
          metadata = res
        })
        .catch((err) => {
          setError(err)
        })
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

  const handleUseTemplate = () => {
    if (template) {
      setJson(template)
    }
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <SelectProject
          id="msg-create-batch-project-id"
          options={projects}
          selected={projectId}
          setSelected={setProjectId}
        />
        <hr />
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
        <SelectOption
          id="metadata-input"
          label="metadata input"
          options={[
            { id: 'schema-form', label: 'schema form' },
            { id: 'custom-json', label: 'custom json' },
          ]}
          setSelected={setInput}
        />
        {input === 'schema-form' && (
          <InputsFromJSON example={example} json={json} setJson={setJson} />
        )}
        {input === 'custom-json' && (
          <InputJSON
            json={json}
            placeholder={example}
            setJson={setJson}
            useTemplate={handleUseTemplate}
            showUseTemplate={context && context.length > 0}
          />
        )}
        <hr />
        <InputIssuances
          id="msg-create-batch-issuance"
          label="issuance"
          issuances={issuance}
          setIssuances={setIssuance}
        />
        <hr />
        <SelectStorage
          network={network}
          dataStorage={dataStorage}
          setDataStorage={setDataStorage}
        />
        <button type="submit">{'submit'}</button>
      </form>
      <ResultTx
        error={error || initError}
        rest={chainInfo?.rest}
        success={success}
      />
    </div>
  )
}

export default CreateBatch
