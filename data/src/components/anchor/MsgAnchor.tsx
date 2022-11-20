import * as React from "react"
import { useState } from "react"

import * as styles from "./MsgAnchor.module.css"

const regenRedwoodUrl = "https://redwood.chora.io/rest"
const regenHambachUrl = "https://hambach.chora.io/rest"

const txBroadcastUrl = "/cosmos/tx/v1beta1/txs"

const MsgAnchor = () => {

  const [data, setData] = useState("");
  const [network, setNetwork] = useState(regenRedwoodUrl);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    fetch(network + txBroadcastUrl, {
      method: 'POST',
      body: data, // TODO: create transaction
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)

        if (data.code != 0) {
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
          <label htmlFor="data">
            {"data"}
            <textarea
              id="data"
              value={data}
              onChange={event => setData(event.target.value)}
            />
          </label>
          <label htmlFor="network">
            {"network"}
            <select
              id="network"
              value={network}
              onChange={event => setNetwork(event.target.value)}
            >
              <option value={regenRedwoodUrl}>
                {"regen-redwood-1"}
              </option>
              <option value={regenHambachUrl}>
                {"regen-hambach-2"}
              </option>
            </select>
          </label>
          <button type="submit">
            {"anchor"}
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

export default MsgAnchor
