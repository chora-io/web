import * as React from "react"

import Chain from "./Chain"

import * as styles from "./Chains.module.css"

import {
  choraTestnet,
  regenMainnet,
  regenRedwood,
  regenHambach,
} from "../../utils/chains"

const Chains = () => {

  // ...

  return (
    <div className={styles.container}>
      <div>
        <h1>
          {"networks"}
        </h1>
        <p>
          {"chora is providing network services for the following blockchains"}
        </p>
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
              chainInfo={regenHambach}
              dashboardUrl="/hambach"
            />
            <Chain
              chainInfo={choraTestnet}
              dashboardUrl="/testnet"
            />
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Chains
