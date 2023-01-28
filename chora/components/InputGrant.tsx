import * as React from "react"
import { useEffect, useState } from "react"

import { GenericAuthorization, Grant } from "../api/cosmos/authz/v1beta1/authz"

import InputTimestamp from "./InputTimestamp"
import SelectMessage from "./SelectMessage"

import * as styles from "./InputGrant.module.css"

const defaultId = "grant"
const defaultLabel = "grant"

const InputGrant = ({ id, label, network, setGrant }: any) => {

  const [message, setMessage] = useState<any>(undefined)
  const [expiration, setExpiration] = useState<string>("")

  useEffect(() => {

    const a = {
      typeUrl: "/cosmos.authz.v1beta1.Authorization",
      value: GenericAuthorization.encode({
        msg: message ? message.typeUrl : "",
      }).finish(),
    }

    const g = {
      typeUrl: "/cosmos.authz.v1beta1.Grant",
      value: Grant.encode({
        authorization: a,
        expiration: new Date(expiration),
      }).finish(),
    }

    setGrant(g)

  }, [message, expiration])

  return (
    <span className={styles.grant}>
      <SelectMessage
        id={(id || defaultId) + "-message"}
        label={(label || defaultLabel) + " message"}
        typeOnly={true}
        network={network}
        message={message}
        setMessage={setMessage}
      />
      <InputTimestamp
        id={(id || defaultId) + "-expiration"}
        label={(label || defaultLabel) + " expiration"}
        timestamp={expiration}
        setTimestamp={setExpiration}
      />
    </span>
  )
}

export default InputGrant
