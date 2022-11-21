import * as React from "react"
import { useState } from "react"

import * as styles from "./QueryAnchor.module.css"

import {
  choraLocal,
  choraTestnet,
  regenLocal,
  regenRedwood,
  regenHambach,
} from "../../utils/chains"

const queryAnchor = "/regen/data/v1/anchor-by-iri"

const QueryAnchor = () => {

  const [iri, setIri] = useState("");
  const [rest, setRest] = useState(choraLocal.rest);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    fetch(rest + queryAnchor + "/" + iri)
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setError(data.message);
        } else {
          setResponse(data);
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
            <textarea
              id="iri"
              value={iri}
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
            {"search"}
          </button>
        </form>
      </div>
      {error != "" && (
        <div className={styles.error}>
          {error}
        </div>
      )}
      {response != "" && (
        <div>
          {response}
        </div>
      )}
    </>
  )
}

export default QueryAnchor
