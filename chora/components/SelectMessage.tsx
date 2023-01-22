import * as React from "react"
import { useState } from "react"

// chora.geonode.v1
import GeonodeMsgCreate from "./geonode/MsgCreate"
import GeonodeMsgUpdateCurator from "./geonode/MsgUpdateCurator"
import GeonodeMsgUpdateMetadata from "./geonode/MsgUpdateMetadata"

// chora.voucher.v1
import VoucherMsgCreate from "./voucher/MsgCreate"
import VoucherMsgIssue from "./voucher/MsgIssue"
import VoucherMsgUpdateIssuer from "./voucher/MsgUpdateIssuer"
import VoucherMsgUpdateMetadata from "./voucher/MsgUpdateMetadata"

// cosmos.bank.v1beta1
import BankMsgSend from "./bank/MsgSend"

// cosmos.group.v1
import GroupMsgCreateGroup from "./group/MsgCreateGroup"
import GroupMsgCreateGroupPolicy from "./group/MsgCreateGroupPolicy"
import GroupMsgCreateGroupWithPolicy from "./group/MsgCreateGroupWithPolicy"
import GroupMsgExec from "./group/MsgExec"
import GroupMsgLeaveGroup from "./group/MsgLeaveGroup"
import GroupMsgSubmitProposal from "./group/MsgSubmitProposal"
import GroupMsgUpdateGroupAdmin from "./group/MsgUpdateGroupAdmin"
import GroupMsgUpdateGroupMembers from "./group/MsgUpdateGroupMembers"
import GroupMsgUpdateGroupMetadata from "./group/MsgUpdateGroupMetadata"
import GroupMsgUpdateGroupPolicyAdmin from "./group/MsgUpdateGroupPolicyAdmin"
import GroupMsgUpdateGroupPolicyDecisionPolicy from "./group/MsgUpdateGroupPolicyDecisionPolicy"
import GroupMsgUpdateGroupPolicyMetadata from "./group/MsgUpdateGroupPolicyMetadata"
import GroupMsgVote from "./group/MsgVote"
import GroupMsgWithdrawProposal from "./group/MsgWithdrawProposal"

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
  "cosmos.group.v1.MsgExec",
  "cosmos.group.v1.MsgLeaveGroup",
  "cosmos.group.v1.MsgSubmitProposal",
  "cosmos.group.v1.MsgUpdateGroupAdmin",
  "cosmos.group.v1.MsgUpdateGroupMembers",
  "cosmos.group.v1.MsgUpdateGroupMetadata",
  "cosmos.group.v1.MsgUpdateGroupPolicyAdmin",
  "cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy",
  "cosmos.group.v1.MsgUpdateGroupPolicyMetadata",
  "cosmos.group.v1.MsgVote",
  "cosmos.group.v1.MsgWithdrawProposal",
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
          <GeonodeMsgCreate
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
          <GeonodeMsgUpdateCurator
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
          <GeonodeMsgUpdateMetadata
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
          <VoucherMsgCreate
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
          <VoucherMsgIssue
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
          <VoucherMsgUpdateIssuer
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
          <VoucherMsgUpdateMetadata
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
          <BankMsgSend
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
          <GroupMsgCreateGroup
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
          <GroupMsgCreateGroupPolicy
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
          <GroupMsgCreateGroupWithPolicy
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "cosmos.group.v1.MsgExec" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <GroupMsgExec
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
          <GroupMsgLeaveGroup
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "cosmos.group.v1.MsgSubmitProposal" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <GroupMsgSubmitProposal
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
          <GroupMsgUpdateGroupAdmin
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
          <GroupMsgUpdateGroupMembers
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
          <GroupMsgUpdateGroupMetadata
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
          <GroupMsgUpdateGroupPolicyAdmin
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
          <GroupMsgUpdateGroupPolicyDecisionPolicy
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
          <GroupMsgUpdateGroupPolicyMetadata
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "cosmos.group.v1.MsgVote" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <GroupMsgVote
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {selected === "cosmos.group.v1.MsgWithdrawProposal" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <GroupMsgWithdrawProposal
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
    </>
  )
}

export default SelectMessage
