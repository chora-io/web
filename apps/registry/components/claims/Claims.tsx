'use client'

import { InputIRI, Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'

import styles from './Claims.module.css'

const queryAnchor = '/regen/data/v1/anchor-by-iri'

const Claims = () => {
  const router = useRouter()
  const { chainInfo, network } = useContext(WalletContext)

  const [iri, setIri] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    await fetch(chainInfo.rest + '/' + queryAnchor + '/' + iri)
      .then((res) => res.json())
      .then((res) => {
        if (res.code) {
          setError(res.message)
        } else {
          router.push(`/claims/${iri}`)
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'Data Lookup'}</h2>
        <p>{'look up data record using content identifier'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputIRI
          id="claims-by-iri"
          label=""
          placeholder=""
          network={network}
          string={iri}
          setIri={setIri}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} />
    </div>
  )
}

export default Claims
