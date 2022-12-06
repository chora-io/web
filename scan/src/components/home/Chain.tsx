import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "gatsby"

import { formatTimestamp } from "../../utils/timestamp"

import * as styles from "./Chain.module.css"

const queryBlocksLatest = "/cosmos/base/tendermint/v1beta1/blocks/latest"

const Chain = ({ link, rest }: any) => {

  const [chainId, setChainId] = useState<string>("")
  const [height, setHeight] = useState<number>(0)
  const [timestamp, setTimestamp] = useState<string>("")
  const [error, setError] = useState<string>("")

  const [count, setCount] = useState<number>(0)

  useEffect(() => {

    // fetch latest block header data
    fetch(rest + queryBlocksLatest)
      .then(res => res.json())
      .then(data => {
        setChainId(data.block.header.chain_id)
        setHeight(data.block.header.height)
        setTimestamp(formatTimestamp(data.block.header.time))
      })
      .catch(err => {
        setError(err.message)
      })

    setTimeout(() => {
      setCount(count+1)
    }, 3000)
  }, [count])

  return (
    <div className={styles.content}>
      {error == "" ? (
        <div>
          <h3>
            {chainId || ""}
          </h3>
          <p>
            <i>
              {timestamp || ""}
            </i>
          </p>
          <p>
            {height || ""}
          </p>
          <p>
            <Link to={link}>
              {chainId ? "view dashboard" : ""}
            </Link>
          </p>
        </div>
      ): (
        <div>
          <p className={styles.error}>
            {error}
          </p>
          <p className={styles.error}>
            {rest}
          </p>
        </div>
      )}
    </div>
  )
}

export default Chain
