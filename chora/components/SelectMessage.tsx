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

// cosmos.bank.v1beta1
import BankMsgSendInputs from "./bank/MsgSendInputs"

// cosmos.group.v1
import GroupMsgCreateGroupInputs from "./group/MsgCreateGroupInputs"
import GroupMsgCreateGroupPolicyInputs from "./group/MsgCreateGroupPolicyInputs"
import GroupMsgCreateGroupWithPolicyInputs from "./group/MsgCreateGroupWithPolicyInputs"
import GroupMsgLeaveGroupInputs from "./group/MsgLeaveGroupInputs"
import GroupMsgUpdateGroupAdminInputs from "./group/MsgUpdateGroupAdminInputs"
import GroupMsgUpdateGroupMembersInputs from "./group/MsgUpdateGroupMembersInputs"
import GroupMsgUpdateGroupMetadataInputs from "./group/MsgUpdateGroupMetadataInputs"
import GroupMsgUpdateGroupPolicyAdminInputs from "./group/MsgUpdateGroupPolicyAdminInputs"
import GroupMsgUpdateGroupPolicyDecisionPolicyInputs from "./group/MsgUpdateGroupPolicyDecisionPolicyInputs"
import GroupMsgUpdateGroupPolicyMetadataInputs from "./group/MsgUpdateGroupPolicyMetadataInputs"

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
  "cosmos.group.v1.MsgCreateGroup",
  "cosmos.group.v1.MsgCreateGroupPolicy",
  "cosmos.group.v1.MsgCreateGroupWithPolicy",
  "cosmos.group.v1.MsgLeaveGroup",
  "cosmos.group.v1.MsgUpdateGroupAdmin",
  "cosmos.group.v1.MsgUpdateGroupMembers",
  "cosmos.group.v1.MsgUpdateGroupMetadata",
  "cosmos.group.v1.MsgUpdateGroupPolicyAdmin",
  "cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy",
  "cosmos.group.v1.MsgUpdateGroupPolicyMetadata",
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
      {selected === "cosmos.group.v1.MsgCreateGroup" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <GroupMsgCreateGroupInputs
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "cosmos.group.v1.MsgCreateGroupPolicy" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <GroupMsgCreateGroupPolicyInputs
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "cosmos.group.v1.MsgCreateGroupWithPolicy" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <GroupMsgCreateGroupWithPolicyInputs
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "cosmos.group.v1.MsgLeaveGroup" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <GroupMsgLeaveGroupInputs
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "cosmos.group.v1.MsgUpdateGroupAdmin" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <GroupMsgUpdateGroupAdminInputs
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "cosmos.group.v1.MsgUpdateGroupMembers" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <GroupMsgUpdateGroupMembersInputs
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "cosmos.group.v1.MsgUpdateGroupMetadata" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <GroupMsgUpdateGroupMetadataInputs
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "cosmos.group.v1.MsgUpdateGroupPolicyAdmin" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <GroupMsgUpdateGroupPolicyAdminInputs
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <GroupMsgUpdateGroupPolicyDecisionPolicyInputs
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "cosmos.group.v1.MsgUpdateGroupPolicyMetadata" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <GroupMsgUpdateGroupPolicyMetadataInputs
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
    </>
  )
}

export default SelectMessage
