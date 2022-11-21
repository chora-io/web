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

const convertIRIToHash = "/regen/data/v1/convert-hash-to-iri"

const hashPlaceholder = `{
  "content_hash": {
    "graph": {
      "hash": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
      "digest_algorithm": "DIGEST_ALGORITHM_BLAKE2B_256",
      "canonicalization_algorithm": "GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015",
      "merkle_tree": "GRAPH_MERKLE_TREE_NONE_UNSPECIFIED"
    }
  }
}`

const ConvertHashToIRI = () => {

  const [hash, setIri] = useState("");
  const [rest, setRest] = useState(choraLocal.rest);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    fetch(rest + convertIRIToHash, {
      method: 'POST',
      body: hash,
    })
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setError(data.message);
        } else {
          setResult(data.iri);
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
          <label htmlFor="hash">
            {"content hash"}
            <textarea
              id="hash"
              value={hash}
              placeholder={hashPlaceholder}
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

export default ConvertHashToIRI
