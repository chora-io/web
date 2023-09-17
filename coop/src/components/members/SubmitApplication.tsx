import * as React from "react"
import { useContext, useState } from "react"
import * as jsonld from "jsonld"

import { WalletContext } from "chora"
import { InputString, Result } from "chora/components"
import { useNetworkServer } from "chora/hooks"

import * as styles from "./SubmitApplication.module.css"

const SubmitApplication = () => {

  const { chainInfo } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  // form input
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  // form error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  // submit application to network server
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    // set JSON-LD document
    const doc = {
      "@context": "https://schema.chora.io/contexts/group_member_application.jsonld",
      name: name,
      description: description,
    }

    // check and normalize JSON-LD document
    const normalized = await jsonld.normalize(doc, {
      algorithm: "URDNA2015",
      format: "application/n-quads",
    }).catch(err => {
      setError(err.message)
      return
    })

    // return error if empty
    if (normalized == "") {
      setError("JSON-LD empty after normalized")
      return
    }

    // set post request body
    const body = {
      canon: "URDNA2015",
      context: "https://schema.chora.io/contexts/group_member_application.jsonld",
      digest: "BLAKE2B_256",
      jsonld: JSON.stringify(doc),
      merkle: "UNSPECIFIED"
    }

    let iri: string

    // post data to network server
    await fetch(serverUrl + "/data", {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setError(data.message)
        } else {
          iri = data["iri"]
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  return (
    <div className={styles.box}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputString
          id="applicant-name"
          label="applicant name"
          placeholder="Jane Doe"
          string={name}
          setString={setName}
        />
        <InputString
          id="applicant-description"
          label="applicant description"
          placeholder="Experienced remote sensing specialist."
          string={description}
          setString={setDescription}
        />
        <button type="submit">
          {"submit"}
        </button>
      </form>
      {(success || error) && (
        <div className={styles.boxResultBelow}>
          <Result
            error={error}
            success={success}
          />
        </div>
      )}
    </div>
  )
}

export default SubmitApplication
