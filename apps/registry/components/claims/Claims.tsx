'use client'

import { Result } from 'chora/components'
import { InputIRI } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'

import styles from './Claims.module.css'

const queryAnchor = '/regen/data/v1/anchor-by-iri'

const Claims = () => {
  const router = useRouter()
  const { chainInfo, network } = useContext(WalletContext)

  // form inputs
  const [iri, setIri] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    await fetch(chainInfo.rest + '/' + queryAnchor + '/' + iri)
      .then((res) => res.json())
      .then((res) => {
        if (res.code) {
          setError(res.message)
        } else {
          router.push(`/${network}/claims/${iri}`)
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <p>{'Look up data claim by content identifier...'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputIRI
          id="claims-by-iri"
          label=""
          placeholder=""
          network={network}
          iri={iri}
          setIri={setIri}
        />
        <button type="submit">{'search'}</button>
      </form>
      <Result error={error} />
    </div>
  )
}

export default Claims
