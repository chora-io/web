'use client'

import { ResultTx } from 'chora/components'
import { InputString, SelectDataStorage } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useMetadata, useNetworkServer } from 'chora/hooks'
import { signAndBroadcast } from 'chora/utils'
import { MsgUpdateGroupPolicyMetadata } from 'cosmos/api/cosmos/group/v1/tx'
import * as jsonld from 'jsonld'
import { useParams } from 'next/navigation'
import { useContext, useState } from 'react'

import { GroupContext } from '@contexts/GroupContext'
import { usePermissionsAdmin } from '@hooks/usePermissionsAdmin'

import styles from './UpdateAccountMetadata.module.css'

const UpdateAccountMetadata = () => {
  const { address } = useParams()
  const { policies } = useContext(GroupContext)
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  const [isAdmin, isPolicy, isAuthz] = usePermissionsAdmin(
    wallet,
    '/cosmos.group.v1.MsgUpdateGroupPolicyMetadata',
  )

  const [metadata, metadataError] = useMetadata(
    chainInfo,
    policies?.find((p: any) => p.address === address)?.metadata,
  )

  // TODO: handle error
  if (metadataError) {
    console.error(metadataError)
  }

  // form inputs
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  // data storage
  const [dataStorage, setDataStorage] = useState<string>('json')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    let metadata: string = ''

    // handle data storage json
    if (dataStorage === 'json') {
      metadata = JSON.stringify({
        name: name,
        description: description,
      })
    }

    // handle data storage iri
    if (dataStorage === 'server') {
      // set JSON-LD document
      const doc = {
        '@context': 'https://schema.chora.io/contexts/group_policy.jsonld',
        name: name,
        description: description,
      }

      // check and normalize JSON-LD document
      const normalized = await jsonld
        .normalize(doc, {
          algorithm: 'URDNA2015',
          format: 'application/n-quads',
        })
        .catch((err) => {
          setError(err.message)
          return
        })

      // return error if empty
      if (normalized == '') {
        setError('JSON-LD empty after normalized')
        return
      }

      // set post request body
      const body = {
        canon: 'URDNA2015',
        context: 'https://schema.chora.io/contexts/group_policy.jsonld',
        digest: 'BLAKE2B_256',
        jsonld: JSON.stringify(doc),
        merkle: 'UNSPECIFIED',
      }

      let iri: string | undefined

      // post data to network server
      await fetch(serverUrl + '/data', {
        method: 'POST',
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code) {
            setError(data.message)
          } else {
            iri = network.includes('chora')
              ? data['iri']
              : network.split('-')[0] + ':' + data['iri'].split(':')[1]
          }
        })
        .catch((err) => {
          setError(err.message)
        })

      // return error if iri never set
      if (typeof iri === 'undefined') {
        return
      }

      metadata = iri
    }

    // set message
    const msg = {
      $type: 'cosmos.group.v1.MsgUpdateGroupPolicyMetadata',
      admin: wallet['bech32Address'],
      groupPolicyAddress: `${address}`,
      metadata: metadata,
    } as unknown as MsgUpdateGroupPolicyMetadata

    // convert message to any message
    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgUpdateGroupPolicyMetadata',
      value: MsgUpdateGroupPolicyMetadata.encode(msg).finish(),
    }

    // sign and broadcast message to selected network
    await signAndBroadcast(chainInfo, wallet['bech32Address'], [msgAny])
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

  return (
    <div className={styles.box}>
      <div className={styles.boxOptions}>
        <span style={{ fontSize: '0.9em', marginRight: '1.5em', opacity: 0.5 }}>
          <b>{isAdmin ? '✓' : 'x'}</b>
          <span style={{ marginLeft: '0.5em' }}>{'admin account'}</span>
        </span>
        <span style={{ fontSize: '0.9em', marginRight: '1.5em', opacity: 0.5 }}>
          <b>{isPolicy ? '✓' : 'x'}</b>
          <span style={{ marginLeft: '0.5em' }}>{'policy + member'}</span>
        </span>
        <span style={{ fontSize: '0.9em', marginRight: '1.5em', opacity: 0.5 }}>
          <b>{isAuthz ? '✓' : 'x'}</b>
          <span style={{ marginLeft: '0.5em' }}>{'authz grantee'}</span>
        </span>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputString
          id="account-name"
          label="account name"
          placeholder="Updated Account"
          string={name}
          initString={metadata?.name}
          setString={setName}
        />
        <InputString
          id="account-description"
          label="account description"
          placeholder="A group account for resource management."
          string={description}
          initString={metadata?.description}
          setString={setDescription}
        />
        <hr />
        <SelectDataStorage
          network={network}
          dataStorage={dataStorage}
          setDataStorage={setDataStorage}
        />
        <button type="submit">{'submit'}</button>
      </form>
      <div className={styles.boxText}>
        <ResultTx error={error} rest={chainInfo?.rest} success={success} />
      </div>
    </div>
  )
}

export default UpdateAccountMetadata
