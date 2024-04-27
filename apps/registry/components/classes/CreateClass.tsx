'use client'

import { MsgCreateClass as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import { ResultTx } from 'chora/components'
import {
  InputJSON,
  InputsFromJSON,
  InputString,
  SelectOption,
  SelectStorage,
} from 'chora/components/forms'
import {
  InputIssuers,
  SelectCreditType,
} from 'chora/components/forms/regen.ecocredit.v1'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer, useSchema } from 'chora/hooks'
import { useClassFee, useCreditTypes } from 'chora/hooks'
import { postToServer, signAndBroadcast } from 'chora/utils'
import { useContext, useState } from 'react'

import { usePermissionsClass } from '@hooks/usePermissionsClass'

import styles from './CreateClass.module.css'

const contextUrl = 'https://schema.chora.io/contexts/ecocredit_class.jsonld'

const CreateClass = () => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  const [context, example, template] = useSchema(contextUrl)

  const [classFee] = useClassFee(chainInfo) // TODO: error
  const [creditTypes] = useCreditTypes(chainInfo) // TODO: error

  const [isCreator, isAuthz, isLoading] = usePermissionsClass(
    wallet,
    '/regen.ecocredit.v1.MsgCreateClass',
  )

  // input option
  const [input, setInput] = useState<string>('schema-form')

  // form inputs
  const [json, setJson] = useState<string>('')

  // data storage
  const [dataStorage, setDataStorage] = useState<string>('json')

  const [issuers, setIssuers] = useState<any[]>([])
  const [creditTypeAbbrev, setCreditTypeAbbrev] = useState<string>('')

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

    const msg = {
      admin: wallet.bech32Address,
      issuers: issuers.map((issuer: any) => issuer.address),
      metadata: metadata,
      creditTypeAbbrev: creditTypeAbbrev,
      fee: { denom: classFee.denom, amount: classFee.amount },
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/regen.ecocredit.v1.MsgCreateClass',
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
    <div id="msg-create-class" className={styles.box}>
      <div className={styles.boxOptions}>
        <span style={{ fontSize: '0.9em', marginRight: '1.5em', opacity: 0.5 }}>
          <b>{isLoading ? '?' : isCreator ? '✓' : 'x'}</b>
          <span style={{ marginLeft: '0.5em' }}>{'class creator'}</span>
        </span>
        <span style={{ fontSize: '0.9em', marginRight: '1.5em', opacity: 0.5 }}>
          <b>{isAuthz ? '✓' : 'x'}</b>
          <span style={{ marginLeft: '0.5em' }}>{'authz grantee'}</span>
        </span>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <SelectCreditType
          id="msg-create-class-credit-type"
          label="credit type"
          options={creditTypes}
          selected={creditTypeAbbrev}
          setSelected={setCreditTypeAbbrev}
        />
        <hr />
        <SelectOption
          id="metadata"
          label="metadata"
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
            useTemplate={() => setJson(template)}
            showUseTemplate={context.length > 0}
          />
        )}
        <hr />
        <InputIssuers
          id="msg-create-class-issuers"
          label="issuers"
          issuers={issuers}
          setIssuers={setIssuers}
        />
        <hr />
        <InputString
          id="msg-create-class-fee-denom"
          label="fee denom"
          disabled={true}
          placeholder="uregen"
          string={classFee?.denom || ''}
        />
        <InputString
          id="msg-create-class-fee-amount"
          label="fee amount"
          disabled={true}
          placeholder="20000000"
          string={classFee?.amount || ''}
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

export default CreateClass
