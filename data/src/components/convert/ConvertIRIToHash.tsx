import * as React from "react"
import { useState } from "react"

import * as styles from "./ConvertIRIToHash.module.css"

import {
  choraLocal,
  choraTestnet,
  regenLocal,
  regenRedwood,
  regenHambach,
} from "../../utils/chains"

const convertIRIToHash = "/regen/data/v1/convert-iri-to-hash"

const iriPlaceholder = "regen:13toVfvC2YxrrfSXWB5h2BGHiXZURsKxWUz72uDRDSPMCrYPguGUXSC.rdf"

const ConvertIRIToHash = () => {

  const [iri, setIri] = useState("");
  const [rest, setRest] = useState(choraLocal.rest);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    fetch(rest + convertIRIToHash + "/" + iri)
      .then(res => res.json())
      .then(data => {
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
              value={rest}
              onChange={event => setRest(event.target.value)}
            >
              <option value={choraLocal.rest}>
                {choraLocal.chainId}
              </option>
              <option value={choraTestnet.rest}>
                {choraTestnet.chainId}
              </option>
              <option value={regenLocal.rest}>
                {regenLocal.chainId}
              </option>
              <option value={regenRedwood.rest}>
                {regenRedwood.chainId}
              </option>
              <option value={regenHambach.rest}>
                {regenHambach.chainId}
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
