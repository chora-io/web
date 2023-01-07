import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "gatsby"

import { formatTimestamp } from "chora/utils/timestamp"

import * as styles from "./Chain.module.css"

const queryBlocksLatest = "/cosmos/base/tendermint/v1beta1/blocks/latest"

const Chain = ({ chainInfo, dashboardUrl }: any) => {

  const [date, setDate] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [height, setHeight] = useState<number>(0)
  const [error, setError] = useState<string>("")

  const [count, setCount] = useState<number>(0)

  useEffect(() => {

    // fetch latest block header data
    fetch(chainInfo.rest + queryBlocksLatest)
      .then(res => res.json())
      .then(data => {
        setHeight(data.block.header.height)
        const timestamp = formatTimestamp(data.block.header.time)
        const split = timestamp.split(" ")
        setDate(split[0])
        setTime(split[1] + " " + split[2])
      })
      .catch(err => {
        setError(err.message)
      })

    setTimeout(() => {
      setCount(count+1)
    }, 6000) // 6 seconds
  }, [count])

  return (
    <tr className={error !== "" ? styles.error : null}>
      <td>
        {chainInfo.chainId || ""}
      </td>
      <td>
        {error || date || ""}
      </td>
      <td>
        {error || time || ""}
      </td>
      <td>
        {error || height || ""}
      </td>
      {error !== "" ? (
        <td>
          {"NA"}
        </td>
      ) : (
        <td>
          <Link to={dashboardUrl}>
            {"view"}
          </Link>
        </td>
      )}
    </tr>
  )
}

export default Chain
