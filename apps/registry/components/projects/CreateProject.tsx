'use client'

import { Permissions, ResultTx } from 'chora/components'
import { InputMetadata, InputString } from 'chora/components/forms'
import { SelectCreditClass } from 'chora/components/forms/regen.ecocredit.v1'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer, useSchema } from 'chora/hooks'
import { postData, postIpfs, signAndBroadcast } from 'chora/utils'
import { MsgCreateProject } from 'cosmos/api/regen/ecocredit/v1/tx'
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

    if (!wallet) {
      setError('keplr wallet not found')
      return // do not continue
    }

    if ((dataStorage === 'ipfs' || dataStorage === 'server') && !serverUrl) {
      setError('server url not found')
      return // do not continue
    }

    let metadata: string = ''

    // TODO: handle string metadata

    // handle json metadata
    if (json.length > 0) {
      let parsed: any = null

      // try to parse JSON
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
    }

    const msg: MsgCreateProject = {
      $type: 'regen.ecocredit.v1.MsgCreateProject',
      admin: wallet.bech32Address,
      classId: classId,
      metadata: metadata,
      jurisdiction: jurisdiction,
      referenceId: referenceId,
    }

    const msgAny = {
      typeUrl: '/regen.ecocredit.v1.MsgCreateProject',
      value: MsgCreateProject.encode(msg).finish(),
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
    <div id="msg-create-project" className={styles.box}>
      <Permissions
        permissions={[
          {
            label: 'class issuer',
            hasPermission: isIssuer,
            isUnknown: !classId || isLoading,
          },
          {
            label: 'authz grantee',
            hasPermission: isAuthz,
          },
        ]}
      />
      <form className={styles.form} onSubmit={handleSubmit}>
        <SelectCreditClass
          id="msg-create-project-class-id"
          label="class id"
          options={classes}
          selected={classId}
          setSelected={setClassId}
        />
        <hr />
        <InputMetadata
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

export default CreateProject
