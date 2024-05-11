'use client'

import { Permissions, ResultTx } from 'chora/components'
import { MetadataInputs } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer, useSchema } from 'chora/hooks'
import { postData, postIpfs, signAndBroadcast } from 'chora/utils'
import { MsgCreate } from 'cosmos/api/chora/content/v1/msg'
import { useContext, useState } from 'react'

import { usePermissions } from '@hooks/usePermissions'

import styles from './AddSubject.module.css'

const contextUrl = 'https://schema.chora.io/contexts/ecosystem_subject.jsonld'

const AddSubject = () => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  const [context, example, template, schemaError] = useSchema(contextUrl)

  const [isAuthz, permError] = usePermissions(
    wallet,
    '/regen.ecocredit.v1.MsgCreateProject',
  )

  // error fetching initial parameters
  const initError = schemaError || permError

  // input option
  const [input, setInput] = useState<string>('schema-form')

  // form inputs
  const [json, setJson] = useState<string>('')

  // data storage
  const [dataStorage, setDataStorage] = useState<string>('json')

  // error and success
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

    const msg: MsgCreate = {
      $type: 'chora.content.v1.MsgCreate',
      curator: wallet?.bech32Address,
      metadata: metadata,
    }

    const msgAny = {
      typeUrl: '/chora.geonode.v1.MsgCreate',
      value: MsgCreate.encode(msg).finish(),
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
    <div id="msg-add-subject" className={styles.box}>
      <Permissions
        permissions={[
          {
            label: 'new steward',
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

export default AddSubject
