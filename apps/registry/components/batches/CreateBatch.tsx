'use client'

import { Permissions, ResultTx } from 'chora/components'
import { InputTimestamp, MetadataInputs } from 'chora/components/forms'
import {
  InputIssuances,
  SelectProject,
} from 'chora/components/forms/regen.ecocredit.v1'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer, useSchema } from 'chora/hooks'
import { postData, postIpfs, signAndBroadcast } from 'chora/utils'
import { MsgCreateBatch } from 'cosmos/api/regen/ecocredit/v1/tx'
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

    if (!wallet) {
      setError('keplr wallet not found')
      return // do not continue
    }

    if ((dataStorage === 'ipfs' || dataStorage === 'server') && !serverUrl) {
      setError('server url not found')
      return // do not continue
    }

    let metadata: string = ''

    // try to parse JSON
    let parsed: any
    try {
      parsed = JSON.parse(json)
    } catch (err) {
      setError('invalid json')
      return // do not continue
    }

    // handle data storage json
    if (dataStorage === 'json') {
      delete parsed['@context']
      metadata = JSON.stringify(parsed)
    }

    // handle data storage ipfs
    if (dataStorage === 'ipfs' && serverUrl) {
      await postIpfs(parsed, network, serverUrl)
        .then((res) => {
          metadata = res
        })
        .catch((err) => {
          setError(err)
        })
    }

    // handle data storage server
    if (dataStorage === 'server' && serverUrl) {
      await postData(parsed, network, serverUrl)
        .then((res) => {
          metadata = res
        })
        .catch((err) => {
          setError(err)
        })
    }

    const msg: MsgCreateBatch = {
      $type: 'regen.ecocredit.v1.MsgCreateBatch',
      issuer: wallet.bech32Address,
      projectId: projectId,
      issuance: issuance,
      metadata: metadata,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      open: false,
    }

    const msgAny = {
      typeUrl: '/regen.ecocredit.v1.MsgCreateBatch',
      value: MsgCreateBatch.encode(msg).finish(),
    }

    await signAndBroadcast(chainInfo, wallet.bech32Address, [msgAny])
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
      <Permissions
        permissions={[
          {
            label: 'class issuer',
            hasPermission: isIssuer,
            isUnknown: !projectId || isLoading,
          },
          {
            label: 'authz grantee',
            hasPermission: isAuthz,
          },
        ]}
      />
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
        <MetadataInputs
          network={network}
          input={input}
          setInput={setInput}
          json={json}
          setJson={setJson}
          context={context}
          example={example}
          useTemplate={handleUseTemplate}
          dataStorage={dataStorage}
          setDataStorage={setDataStorage}
        />
        <hr />
        <InputIssuances
          id="msg-create-batch-issuance"
          label="issuance"
          issuances={issuance}
          setIssuances={setIssuance}
        />
        <hr />
        <button type="submit">{'submit'}</button>
      </form>
      <ResultTx
        error={initError || error}
        rest={chainInfo?.rest}
        success={success}
      />
    </div>
  )
}

export default CreateBatch
