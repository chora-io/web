import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "../context/WalletContext"

import * as styles from "./InputMessages.module.css"

const choraPlaceholder = `[
  {
    "typeUrl": "/cosmos.bank.v1beta1.MsgSend",
    "value": {
      "fromAddress": "chora1afk9zr2hn2jsac63h4hm60vl9z3e5u69gndzf7c99cqge3vzwjzsdnjkmu",
      "toAddress": "chora1jx34255cgvxpthkg572ma6rhq6crwl6xh7g0md",
      "amount": [
        {
          "denom": "uchora",
          "amount": "1000000"
        }
      ]
    }
  }
]`

const regenPlaceholder = `[
  {
    "typeUrl": "/cosmos.bank.v1beta1.MsgSend",
    "value": {
      "from_address": "regen1afk9zr2hn2jsac63h4hm60vl9z3e5u69gndzf7c99cqge3vzwjzsdnjkmu",
      "to_address": "regen1jx34255cgvxpthkg572ma6rhq6crwl6x2s4ajx",
      "amount": [
        {
          "denom": "uregen",
          "amount": "1000000"
        }
      ]
    }
  }
]`

const InputMessages = ({ id, label, messages, setMessages }: any) => {

  // @ts-ignore
  const { network } = useContext(WalletContext)

  let placeholder: string
  if (network.includes("chora")) {
    placeholder = choraPlaceholder
  } else {
    placeholder = regenPlaceholder
  }

  return (
    <label htmlFor={id ? id : "messages"}>
      {label ? label : "messages"}
      <textarea
        className={styles.long}
        id={id ? id : "messages"}
        value={messages}
        placeholder={placeholder}
        onChange={event => setMessages(event.target.value)}
      />
    </label>
  )
}

export default InputMessages
