'use client'

import { InputString, ResultTx } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useNetworkServer } from 'chora/hooks'
import { signAndBroadcast } from 'chora/utils'
import { MsgUpdateGroupMetadata } from 'cosmos/api/cosmos/group/v1/tx'
import * as jsonld from 'jsonld'
import * as Long from 'long'
import { useParams } from 'next/navigation'
import { useContext, useState } from 'react'

import styles from './UpdateGroupMetadata.module.css'

const UpdateGroupMetadata = () => {
  const { groupId } = useParams()
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  // form input
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  // fetch and form error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  // submit group
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    // set JSON-LD document
    const doc = {
      '@context': 'https://schema.chora.io/contexts/group.jsonld',
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
      context: 'https://schema.chora.io/contexts/group.jsonld',
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

    // set submit group message
    const msg = {
      $type: 'cosmos.group.v1.MsgUpdateGroupMetadata',
      admin: wallet['bech32Address'],
      groupId: Long.fromString(`${groupId}` || '0'),
      metadata: iri,
    } as unknown as MsgUpdateGroupMetadata

    // convert message to any message
    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgUpdateGroupMetadata',
      value: MsgUpdateGroupMetadata.encode(msg).finish(),
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputString
          id="group-name"
          label="group name"
          placeholder="New Group"
          string={name}
          setString={setName}
        />
        <InputString
          id="group-description"
          label="group description"
          placeholder="A group of members with shared resources."
          string={description}
          setString={setDescription}
        />
        <button type="submit">{'submit'}</button>
      </form>
      {(success || error) && (
        <div className={styles.boxResultBelow}>
          <ResultTx error={error} rest={chainInfo?.rest} success={success} />
        </div>
      )}
    </div>
  )
}

export default UpdateGroupMetadata
