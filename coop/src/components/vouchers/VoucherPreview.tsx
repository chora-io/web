import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "gatsby"

import * as styles from "./VoucherPreview.module.css"

const serverUrl = "https://server.chora.io"

const VoucherPreview = ({ voucher }) => {

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [metadata, setMetadata] = useState<any>(null)

  // fetch on load and value change
  useEffect(() => {
    setMetadata(null)
    setError("")

    fetchMetadata().catch(err => {
      setError(err.message)
    })
  }, [voucher["metadata"]])

  // fetch metadata asynchronously
  const fetchMetadata = async () => {

    // fetch voucher data from chora server
    await fetch(serverUrl + "/" + voucher["metadata"])
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
          setMetadata(null)
        } else if (res.context !== "https://schema.chora.io/contexts/voucher.jsonld") {
          setError("unsupported metadata schema")
          setMetadata(null)
        } else {
          setError("")
          setMetadata(JSON.parse(res["jsonld"]))
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  return (
    <div className={styles.boxItem}>
      {!voucher && !metadata && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {voucher && metadata && (
        <div>
          <div className={styles.boxText}>
            <h3>
              {"name"}
            </h3>
            <p>
              {metadata["name"]}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"issuer"}
            </h3>
            <p>
              {voucher["issuer"]}
            </p>
          </div>
          <Link to={`/vouchers/?id=${voucher["id"]}`}>
            {"view voucher"}
          </Link>
        </div>
      )}
      {error && (
        <div>
          {error}
        </div>
      )}
    </div>
  )
}

export default VoucherPreview
