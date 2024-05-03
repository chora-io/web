'use client'

import { MsgCreateProject as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import { ResultTx } from 'chora/components'
import {
  InputJSON,
  InputsFromJSON,
  InputString,
  SelectOption,
  SelectStorage,
} from 'chora/components/forms'
import { SelectCreditClass } from 'chora/components/forms/regen.ecocredit.v1'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer, useSchema } from 'chora/hooks'
import { postToServer, signAndBroadcast } from 'chora/utils'
import { useContext, useState } from 'react'

import { useClasses } from '@hooks/useClasses'
import { usePermissionsIssuer } from '@hooks/usePermissionsIssuer'

import styles from './CreateProject.module.css'

const contextUrl = 'https://schema.chora.io/contexts/ecocredit_project.jsonld'

const CreateProject = () => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  const [context, example, template, schemaError] = useSchema(contextUrl)

  const [classes, classesError] = useClasses(chainInfo, 0, 0)

  // input option
  const [input, setInput] = useState<string>('schema-form')

  // form inputs
  const [json, setJson] = useState<string>('')

  // data storage
  const [dataStorage, setDataStorage] = useState<string>('json')

  const [classId, setClassId] = useState<string>('')
  const [jurisdiction, setJurisdiction] = useState<string>('')
  const [referenceId, setReferenceId] = useState<string>('')

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  // NOTE: must come after class id form input state is declared
  const [isIssuer, isAuthz, isLoading, permError] = usePermissionsIssuer(
    wallet,
    classId,
    '/regen.ecocredit.v1.MsgCreateProject',
  )

  // error fetching initial parameters
  const initError = schemaError || classesError || permError

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
      admin: wallet.bech32Address,
      classId: classId,
      metadata: metadata,
      jurisdiction: jurisdiction,
      referenceId: referenceId,
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/regen.ecocredit.v1.MsgCreateProject',
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
    <div id="msg-create-project" className={styles.box}>
      <div className={styles.boxOptions}>
        <span style={{ fontSize: '0.9em', marginRight: '1.5em', opacity: 0.5 }}>
          <b>{!classId || isLoading ? '?' : isIssuer ? '✓' : 'x'}</b>
          <span style={{ marginLeft: '0.5em' }}>{'class issuer'}</span>
        </span>
        <span style={{ fontSize: '0.9em', marginRight: '1.5em', opacity: 0.5 }}>
          <b>{isAuthz ? '✓' : 'x'}</b>
          <span style={{ marginLeft: '0.5em' }}>{'authz grantee'}</span>
        </span>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <SelectCreditClass
          id="msg-create-project-class-id"
          label="class id"
          options={classes}
          selected={classId}
          setSelected={setClassId}
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
        <InputString
          id="msg-create-project-jurisdiction"
          label="jurisdiction"
          placeholder="US-WA"
          string={jurisdiction}
          setString={setJurisdiction}
        />
        <InputString
          id="msg-create-project-reference-id"
          label="reference id"
          placeholder="VCS-001"
          string={referenceId}
          setString={setReferenceId}
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

export default CreateProject
