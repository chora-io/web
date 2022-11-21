import * as React from "react"
import { useState } from "react"

import * as styles from "./ConnectWallet.module.css"

const ConnectWallet = () => {

  const [keplr, setKeplr] = useState<any>()
  const [key, setKey] = useState<any>()

  const getKeplr = () => {
    if (window.keplr) {
      console.log(window.keplr)
      setKeplr(window.keplr)

      // enable chain
      window.keplr.enable("regen-redwood-1").then(() =>
        console.log("regen-redwood-1 enabled")
      ).catch(err =>
        console.log(err.message)
      )

      // get active key
      window.keplr.getKey("regen-redwood-1").then(key => {
        console.log("regen-redwood-1 key", key)
        setKey(key)
      }).catch(err =>
        console.log(err.message)
      )
    }

    if (document.readyState === "complete") {
      console.log(window.keplr)
      setKeplr(window.keplr)
    }

    const windowStateChange = (event: Event) => {
      console.log(event)

      // get active key
      if (window && window.keplr) {
        window.keplr.getKey("regen-redwood-1").then((key: any) => {
          console.log("regen-redwood-1 key", key)
          setKey(key)
        }).catch((err: { message: string }) =>
          console.log(err.message)
        )
      }
    }

    const documentStateChange = (event: Event) => {
      if (event.target && (event.target as Document).readyState === "complete") {
        console.log(window.keplr)

        document.removeEventListener("readystatechange", documentStateChange)
        window.removeEventListener("keplr_keystorechange", windowStateChange)
      }
    }

    document.addEventListener("readystatechange", documentStateChange)
    window.addEventListener("keplr_keystorechange", windowStateChange)
  }

  return (
    <div>
      <button className={styles.button} onClick={getKeplr}>
        {keplr == null ?
          <span>{"connect wallet"}</span>
        :
          <span>{"wallet connected"}</span>
        }
      </button>
      <div className={styles.address}>
        {key != null &&
          <span>
            {key.bech32Address.substring(0, 10) + "..." + key.bech32Address.substring(38, 44)}
          </span>
        }
      </div>
    </div>
  )
}

export default ConnectWallet
