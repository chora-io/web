'use client'

import { MsgUpdateGroupMetadata } from 'cosmos/api/cosmos/group/v1/tx'
import { Permissions, ResultTx } from 'chora/components'
import {
  InputJSON,
  InputsFromJSON,
  SelectOption,
  SelectStorage,
} from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer, useSchema } from 'chora/hooks'
import { postToServer, signAndBroadcast } from 'chora/utils'
import * as Long from 'long'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

import { GroupContext } from '@contexts/GroupContext'
import { usePermissionsAdmin } from '@hooks/usePermissionsAdmin'

import styles from './UpdateGroupMetadata.module.css'

const contextUrl = 'https://schema.chora.io/contexts/group.jsonld'

const UpdateGroupMetadata = () => {
  const { groupId } = useParams()

  const { metadata: initMetadata, metadataError } = useContext(GroupContext)
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  const [context, example, template, schemaError] = useSchema(contextUrl)

  const [isAdmin, isPolicy, isAuthz, permError] = usePermissionsAdmin(
    wallet,
    '/cosmos.group.v1.MsgUpdateGroupMetadata',
  )

  // error fetching initial parameters
  const initError = metadataError || schemaError || permError

  // input option
  const [input, setInput] = useState('schema-form')

  // metadata input
  const [json, setJson] = useState<string>('')

  // data storage
  const [dataStorage, setDataStorage] = useState<string>('json')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  // load and reset metadata
  useEffect(() => {
    if (initMetadata && !json) {
      setJson(JSON.stringify(initMetadata))
    }
  }, [initMetadata, json])

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

    // set message
    const msg = {
      $type: 'cosmos.group.v1.MsgUpdateGroupMetadata',
      admin: wallet.bech32Address,
      groupId: Long.fromString(`${groupId}` || '0'),
      metadata: metadata,
    } as unknown as MsgUpdateGroupMetadata

    // convert message to any message
    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgUpdateGroupMetadata',
      value: MsgUpdateGroupMetadata.encode(msg).finish(),
    }

    // sign and broadcast message to selected network
    await signAndBroadcast(chainInfo, wallet.bech32Address, [msgAny])
      .then((res) => {
        setSuccess(res)
      })
      .catch((err) => {
        if (err.message === "Cannot read properties of null (reading 'key')") {
          setError('keplr account does not exist on the selected network')
        } else {
          setError(err.message)
        }
      })
  }

  const handleUseTemplate = () => {
    if (template) {
      setJson(template)
    }
  }

  return (
    <div className={styles.box}>
      <Permissions
        permissions={[
          {
            label: 'admin account',
            hasPermission: isAdmin,
          },
          {
            label: 'policy + member',
            hasPermission: isPolicy,
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

export default UpdateGroupMetadata
