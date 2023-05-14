import * as React from "react"

import Chain from "./Chain"

import * as styles from "./Chains.module.css"

import {
  choraLocal,
  choraTestnet,
  regenMainnet,
  regenRedwood,
} from "chora/utils/chains"

const Chains = () => {
  let local: boolean
  if (typeof window !== "undefined" && (
      window.location.hostname == "0.0.0.0" ||
      window.location.hostname == "127.0.0.1" ||
      window.location.hostname == "localhost"
    )
  ) { local = true }

  return (
    <div className={styles.container}>
      <div>
        <h1>
          {"blockchain networks"}
        </h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>
                {"chain id"}
              </td>
              <td>
                {"latest block date"}
              </td>
              <td>
                {"latest block time"}
              </td>
              <td>
                {"latest block height"}
              </td>
              <td>
                {"dashboard"}
              </td>
            </tr>
          </thead>
          <tbody>
            <Chain
              chainInfo={regenMainnet}
              dashboardUrl="/regen"
            />
            <Chain
              chainInfo={regenRedwood}
              dashboardUrl="/redwood"
            />
            <Chain
              chainInfo={choraTestnet}
              dashboardUrl="/testnet"
            />
            {local && (
              <Chain
                chainInfo={{
                  chainId: "local-testnet",
                  rest: "http://localhost:1317",
                }}
                dashboardUrl="/local"
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Chains
