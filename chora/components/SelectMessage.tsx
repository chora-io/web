import * as React from "react"
import { useState } from "react"

// chora.geonode.v1
import {
  MsgCreate as GeonodeMsgCreate,
  MsgUpdateCurator as GeonodeMsgUpdateCurator,
  MsgUpdateMetadata as GeonodeMsgUpdateMetadata,
} from "./geonode"

// chora.voucher.v1
import {
  MsgCreate as VoucherMsgCreate,
  MsgIssue as VoucherMsgIssue,
  MsgUpdateIssuer as VoucherMsgUpdateIssuer,
  MsgUpdateMetadata as VoucherMsgUpdateMetadata,
} from "./voucher"

// cosmos.authz.v1beta1
import {
  MsgExec as AuthzMsgExec,
  MsgGrant as AuthzMsgGrant,
  MsgRevoke as AuthzMsgRevoke,
} from "./authz"

// cosmos.bank.v1beta1
import {
  MsgSend as BankMsgSend,
} from "./bank"

// cosmos.feegrant.v1beta1
import {
  MsgGrantAllowance as FeegrantMsgGrantAllowance,
  MsgRevokeAllowance as FeegrantMsgRevokeAllowance,
} from "./feegrant"

// cosmos.group.v1
import {
  MsgCreateGroup as GroupMsgCreateGroup,
  MsgCreateGroupPolicy as GroupMsgCreateGroupPolicy,
  MsgCreateGroupWithPolicy as GroupMsgCreateGroupWithPolicy,
  MsgExec as GroupMsgExec,
  MsgLeaveGroup as GroupMsgLeaveGroup,
  MsgSubmitProposal as GroupMsgSubmitProposal,
  MsgUpdateGroupAdmin as GroupMsgUpdateGroupAdmin,
  MsgUpdateGroupMembers as GroupMsgUpdateGroupMembers,
  MsgUpdateGroupMetadata as GroupMsgUpdateGroupMetadata,
  MsgUpdateGroupPolicyAdmin as GroupMsgUpdateGroupPolicyAdmin,
  MsgUpdateGroupPolicyDecisionPolicy as GroupMsgUpdateGroupPolicyDecisionPolicy,
  MsgUpdateGroupPolicyMetadata as GroupMsgUpdateGroupPolicyMetadata,
  MsgVote as GroupMsgVote,
  MsgWithdrawProposal as GroupMsgWithdrawProposal,
} from "./group"

// regen.data.v1
import {
  MsgAnchor as DataMsgAnchor,
  MsgAttest as DataMsgAttest,
  MsgDefineResolver as DataMsgDefineResolver,
  MsgRegisterResolver as DataMsgRegisterResolver,
} from "./data"

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
  "cosmos.authz.v1beta1.MsgExec",
  "cosmos.authz.v1beta1.MsgGrant",
  "cosmos.authz.v1beta1.MsgRevoke",
  "cosmos.bank.v1beta1.MsgSend",
  "cosmos.feegrant.v1beta1.MsgGrantAllowance",
  "cosmos.feegrant.v1beta1.MsgRevokeAllowance",
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
  "regen.data.v1.MsgAnchor",
  "regen.data.v1.MsgAttest",
  "regen.data.v1.MsgDefineResolver",
  "regen.data.v1.MsgRegisterResolver",
]

const SelectMessage = ({ id, label, options, typeOnly, network, setMessage }: any) => {

  const opts = options || defaultOptions

  const [selected, setSelected] = useState<string>("")

  const handleSetSelected = (event) => {
    if (typeOnly) {
      setMessage({ typeUrl: "/" + event.target.value })
    }
    setSelected(event.target.value)
  }

  return (
    <>
      <label htmlFor={id ? id : defaultId}>
        {label ? label : defaultLabel}
        <select
          id={id ? id : defaultId}
          value={selected}
          onChange={handleSetSelected}
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
      {!typeOnly && selected === "chora.geonode.v1.MsgCreate" && (
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
      {!typeOnly && selected === "chora.geonode.v1.MsgUpdateCurator" && (
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
      {!typeOnly && selected === "chora.geonode.v1.MsgUpdateMetadata" && (
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
      {!typeOnly && selected === "chora.voucher.v1.MsgCreate" && (
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
      {!typeOnly && selected === "chora.voucher.v1.MsgIssue" && (
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
      {!typeOnly && selected === "chora.voucher.v1.MsgUpdateIssuer" && (
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
      {!typeOnly && selected === "chora.voucher.v1.MsgUpdateMetadata" && (
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
      {!typeOnly && selected === "cosmos.authz.v1beta1.MsgExec" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <AuthzMsgExec
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {!typeOnly && selected === "cosmos.authz.v1beta1.MsgGrant" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <AuthzMsgGrant
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {!typeOnly && selected === "cosmos.authz.v1beta1.MsgRevoke" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <AuthzMsgRevoke
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {!typeOnly && selected === "cosmos.bank.v1beta1.MsgSend" && (
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
      {!typeOnly && selected === "cosmos.feegrant.v1beta1.MsgGrantAllowance" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <FeegrantMsgGrantAllowance
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {!typeOnly && selected === "cosmos.feegrant.v1beta1.MsgRevokeAllowance" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <FeegrantMsgRevokeAllowance
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {!typeOnly && selected === "cosmos.group.v1.MsgCreateGroup" && (
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
      {!typeOnly && selected === "cosmos.group.v1.MsgCreateGroupPolicy" && (
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
      {!typeOnly && selected === "cosmos.group.v1.MsgCreateGroupWithPolicy" && (
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
      {!typeOnly && selected === "cosmos.group.v1.MsgExec" && (
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
      {!typeOnly && selected === "cosmos.group.v1.MsgLeaveGroup" && (
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
      {!typeOnly && selected === "cosmos.group.v1.MsgSubmitProposal" && (
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
      {!typeOnly && selected === "cosmos.group.v1.MsgUpdateGroupAdmin" && (
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
      {!typeOnly && selected === "cosmos.group.v1.MsgUpdateGroupMembers" && (
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
      {!typeOnly && selected === "cosmos.group.v1.MsgUpdateGroupMetadata" && (
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
      {!typeOnly && selected === "cosmos.group.v1.MsgUpdateGroupPolicyAdmin" && (
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
      {!typeOnly && selected === "cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy" && (
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
      {!typeOnly && selected === "cosmos.group.v1.MsgUpdateGroupPolicyMetadata" && (
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
      {!typeOnly && selected === "cosmos.group.v1.MsgVote" && (
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
      {!typeOnly && selected === "cosmos.group.v1.MsgWithdrawProposal" && (
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
      {!typeOnly && selected === "regen.data.v1.MsgAnchor" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <DataMsgAnchor
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {!typeOnly && selected === "regen.data.v1.MsgAttest" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <DataMsgAttest
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {!typeOnly && selected === "regen.data.v1.MsgDefineResolver" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <DataMsgDefineResolver
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
      {!typeOnly && selected === "regen.data.v1.MsgRegisterResolver" && (
        <div className={styles.message}>
          <h3>
            {selected}
          </h3>
          <DataMsgRegisterResolver
            network={network}
            setMessage={setMessage}
          />
        </div>
      )}
    </>
  )
}

export default SelectMessage
