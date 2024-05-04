'use client'

import { Permissions, ResultTx } from 'chora/components'
import {
  InputJSON,
  InputsFromJSON,
  SelectOption,
  SelectStorage,
} from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer, useSchema } from 'chora/hooks'
import { postToServer } from 'chora/utils'
import { useContext, useState } from 'react'

import { usePermissions } from '@hooks/usePermissions'

import styles from './AddVerifier.module.css'

const contextUrl = 'https://schema.chora.io/contexts/ecosystem_verifier.jsonld'

const AddVerifier = () => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  const [context, example, template, schemaError] = useSchema(contextUrl)

  const [isAuthz, permError] = usePermissions(
    wallet,
    '/chora.ecosystem.v1.MsgAddVerifier',
  )

  // error fetching initial parameters
  const initError = schemaError || permError

  // input option
  const [input, setInput] = useState<string>('schema-form')

  // form inputs
  const [json, setJson] = useState<string>('')

  // data storage
  const [dataStorage, setDataStorage] = useState<string>('json')

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

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

    // TODO: sign and broadcast transaction
    setSuccess(metadata)
  }

  const handleUseTemplate = () => {
    if (template) {
      setJson(template)
    }
  }

  return (
    <div id="msg-add-verifier" className={styles.box}>
      <Permissions
        permissions={[
          {
            label: 'new operator',
            hasPermission: true,
          },
          {
            label: 'authz grantee',
            hasPermission: isAuthz,
          },
        ]}
      />
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <SelectStorage
          network={network}
          dataStorage={dataStorage}
          setDataStorage={setDataStorage}
        />
        <button
          type="submit"
          disabled={true}
          style={{ cursor: 'default', opacity: '0.25' }}
        >
          {'submit'}
        </button>
      </form>
      <ResultTx
        error={initError || error}
        rest={chainInfo?.rest}
        success={success}
      />
    </div>
  )
}

export default AddVerifier
