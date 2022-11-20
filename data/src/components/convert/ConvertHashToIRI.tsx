import * as React from "react"
import { useState } from "react"

import * as styles from "./ConvertIRIToHash.module.css"

const localhostUrl = "http://localhost:1317"
const regenRedwoodUrl = "https://redwood.chora.io/rest"
const regenHambachUrl = "https://hambach.chora.io/rest"

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
  const [network, setNetwork] = useState(localhostUrl);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    fetch(network + convertIRIToHash, {
      method: 'POST',
      body: hash,
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)

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

export default ConvertHashToIRI
