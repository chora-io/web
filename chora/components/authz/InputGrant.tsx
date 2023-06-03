import * as React from "react"
import { useEffect, useState } from "react"

import { GenericAuthorization } from "../../api/cosmos/authz/v1beta1/authz"

import InputTimestamp from "../InputTimestamp"
import SelectMessage from "../SelectMessage"

const defaultId = "grant"
const defaultLabel = "grant"

const InputGrant = ({ id, label, network, setGrant }: any) => {

  const [message, setMessage] = useState<any>(undefined)
  const [expiration, setExpiration] = useState<string>("")

  useEffect(() => {

    const a = {
      typeUrl: "/cosmos.authz.v1beta1.GenericAuthorization",
      value: GenericAuthorization.encode({
        msg: message ? message.typeUrl : "",
      }).finish(),
    }

    const g = {
      authorization: a,
      expiration: new Date(expiration),
    }

    setGrant(g)

  }, [message, expiration])

  return (
    <>
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
    </>
  )
}

export default InputGrant
