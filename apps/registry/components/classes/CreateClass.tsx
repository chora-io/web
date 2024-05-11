'use client'

import { Permissions, ResultTx } from 'chora/components'
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
import { MsgCreateClass } from 'cosmos/api/regen/ecocredit/v1/tx'
import { useContext, useState } from 'react'

import { usePermissionsClass } from '@hooks/usePermissionsClass'

import styles from './CreateClass.module.css'
import { Coin } from 'cosmos/api/cosmos/base/v1beta1/coin'

const contextUrl = 'https://schema.chora.io/contexts/ecocredit_class.jsonld'

const CreateClass = () => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  const [context, example, template, schemaError] = useSchema(contextUrl)

  const [classFee, classFeeError] = useClassFee(chainInfo)

  const [creditTypes, creditTypesError] = useCreditTypes(chainInfo)

  const [isCreator, isAuthz, isLoading, permError] = usePermissionsClass(
    wallet,
    '/regen.ecocredit.v1.MsgCreateClass',
  )

  // error fetching initial parameters
  const initError =
    schemaError || classFeeError || creditTypesError || permError

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

    if (!wallet) {
      setError('keplr wallet not found')
      return // do not continue
    }

    if (dataStorage === 'ipfs' || (dataStorage === 'server' && !serverUrl)) {
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

    // handle data storage ipfs or server
    if ((dataStorage === 'ipfs' || dataStorage === 'server') && serverUrl) {
      await postToServer(parsed, network, serverUrl, dataStorage)
        .then((res) => {
          metadata = res
        })
        .catch((err) => {
          setError(err)
        })
    }

    const msg: MsgCreateClass = {
      $type: 'regen.ecocredit.v1.MsgCreateClass',
      admin: wallet.bech32Address,
      issuers: issuers.map((issuer: any) => issuer.address),
      metadata: metadata,
      creditTypeAbbrev: creditTypeAbbrev,
      fee: Coin.fromJSON({ denom: classFee.denom, amount: classFee.amount }),
    }

    const msgAny = {
      typeUrl: '/regen.ecocredit.v1.MsgCreateClass',
      value: MsgCreateClass.encode(msg).finish(),
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
    <div id="msg-create-class" className={styles.box}>
      <Permissions
        permissions={[
          {
            label: 'class creator',
            hasPermission: isCreator,
            isUnknown: isLoading,
          },
          {
            label: 'authz grantee',
            hasPermission: isAuthz,
          },
        ]}
      />
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
      <ResultTx
        error={initError || error}
        rest={chainInfo?.rest}
        success={success}
      />
    </div>
  )
}

export default CreateClass
