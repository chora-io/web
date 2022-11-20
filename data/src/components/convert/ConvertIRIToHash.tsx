import * as React from "react"
import { useState } from "react"

import * as styles from "./ConvertIRIToHash.module.css"

const localhostUrl = "http://localhost:1317"
const regenRedwoodUrl = "https://redwood.chora.io/rest"
const regenHambachUrl = "https://hambach.chora.io/rest"

const convertIRIToHash = "/regen/data/v1/convert-iri-to-hash"

const iriPlaceholder = "regen:13toVfvC2YxrrfSXWB5h2BGHiXZURsKxWUz72uDRDSPMCrYPguGUXSC.rdf"

const ConvertIRIToHash = () => {

  const [iri, setIri] = useState("");
  const [network, setNetwork] = useState(localhostUrl);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    fetch(network + convertIRIToHash + "/" + iri)
      .then(res => res.json())
      .then(data => {
        console.log(data)

        if (data.code) {
          setError(data.message);
        } else {
          setResult(JSON.stringify(data.content_hash, null, "\t"));
        }
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="iri">
            {"iri"}
            <input
              id="iri"
              value={iri}
              placeholder={iriPlaceholder}
              onChange={event => setIri(event.target.value)}
            />
          </label>
          <label htmlFor="network">
            {"network"}
            <select
              id="network"
              value={network}
              onChange={event => setNetwork(event.target.value)}
            >
              <option value={localhostUrl}>
                {"localhost"}
              </option>
              <option value={regenRedwoodUrl}>
                {"regen-redwood-1"}
              </option>
              <option value={regenHambachUrl}>
                {"regen-hambach-2"}
              </option>
            </select>
          </label>
          <button type="submit">
            {"convert"}
          </button>
        </form>
      </div>
      {error != "" && (
        <div className={styles.error}>
          {error}
        </div>
      )}
      {result != "" && (
        <div>
          <pre>
            {result}
          </pre>
        </div>
      )}
    </>
  )
}

export default ConvertIRIToHash
