import * as React from "react"

import Chain from "./Chain"

import * as styles from "./Chains.module.css"

import {
  choraTestnet,
  regenRedwood,
  regenHambach,
} from "../../utils/chains"

const Chains = () => {

  // ...

  return (
    <div className={styles.container}>
      <Chain link="/testnet" rest={choraTestnet.rest} />
      <Chain link="/redwood" rest={regenRedwood.rest} />
      <Chain link="/hambach" rest={regenHambach.rest} />
    </div>
  )
}

export default Chains
