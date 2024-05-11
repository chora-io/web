'use client'

import { Permissions, ResultTx } from 'chora/components'
import { MetadataInputs } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer, useSchema } from 'chora/hooks'
import { postData, postIpfs } from 'chora/utils'
import { useContext, useState } from 'react'

import { usePermissions } from '@hooks/usePermissions'

import styles from './AddMonitor.module.css'

const contextUrl = 'https://schema.chora.io/contexts/ecosystem_monitor.jsonld'

const AddMonitor = () => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  const [context, example, template, schemaError] = useSchema(contextUrl)

  const [isAuthz, permError] = usePermissions(
    wallet,
    '/chora.ecosystem.v1.MsgAddMonitor',
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

    // TODO: sign and broadcast transaction
    setSuccess(metadata)
  }

  const handleUseTemplate = () => {
    if (template) {
      setJson(template)
    }
  }

  return (
    <div id="msg-add-monitor" className={styles.box}>
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

export default AddMonitor
