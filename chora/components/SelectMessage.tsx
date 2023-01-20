import * as React from "react"
import { useState } from "react"

// chora.geonode.v1
import GeonodeMsgCreateInputs from "./geonode/MsgCreateInputs"
import GeonodeMsgUpdateCuratorInputs from "./geonode/MsgUpdateCuratorInputs"
import GeonodeMsgUpdateMetadataInputs from "./geonode/MsgUpdateMetadataInputs"

// chora.voucher.v1
import VoucherMsgCreateInputs from "./voucher/MsgCreateInputs"
import VoucherMsgIssueInputs from "./voucher/MsgIssueInputs"
import VoucherMsgUpdateIssuerInputs from "./voucher/MsgUpdateIssuerInputs"
import VoucherMsgUpdateMetadataInputs from "./voucher/MsgUpdateMetadataInputs"

// cosmos.bank.b1beta1
import BankMsgSendInputs from "./bank/MsgSendInputs"

import * as styles from "./SelectMessage.module.css"

const defaultId = "message"
const defaultLabel = "message"

// all available messages
const defaultOptions = [
  "chora.geonode.v1.MsgCreate",
  "chora.geonode.v1.MsgUpdateCurator",
  "chora.geonode.v1.MsgUpdateMetadata",
  "chora.voucher.v1.MsgCreate",
  "chora.voucher.v1.MsgIssue",
  "chora.voucher.v1.MsgUpdateIssuer",
  "chora.voucher.v1.MsgUpdateMetadata",
  "cosmos.bank.v1beta1.MsgSend",
]

const SelectMessage = ({ id, label, options, network, setMessage }: any) => {

  const opts = options || defaultOptions

  const [selected, setSelected] = useState<string>("")

  return (
    <>
      <label htmlFor={id ? id : defaultId}>
        {label ? label : defaultLabel}
        <select
          id={id ? id : defaultId}
          value={selected}
          onChange={event => setSelected(event.target.value)}
        >
          <option value="">
            {"--- select ---"}
          </option>
          {opts.map((o: string) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
      {selected === "chora.geonode.v1.MsgCreate" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <GeonodeMsgCreateInputs
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "chora.geonode.v1.MsgUpdateCurator" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <GeonodeMsgUpdateCuratorInputs
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "chora.geonode.v1.MsgUpdateMetadata" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <GeonodeMsgUpdateMetadataInputs
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "chora.voucher.v1.MsgCreate" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <VoucherMsgCreateInputs
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "chora.voucher.v1.MsgIssue" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <VoucherMsgIssueInputs
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "chora.voucher.v1.MsgUpdateIssuer" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <VoucherMsgUpdateIssuerInputs
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "chora.voucher.v1.MsgUpdateMetadata" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <VoucherMsgUpdateMetadataInputs
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "cosmos.bank.v1beta1.MsgSend" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <BankMsgSendInputs
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
    </>
  )
}

export default SelectMessage
