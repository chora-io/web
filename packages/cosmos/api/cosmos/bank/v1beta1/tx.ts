/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../../typeRegistry";
import { SendEnabled } from "./bank";

export const protobufPackage = "cosmos.bank.v1beta1";

/**
 * MsgSetSendEnabled is the Msg/SetSendEnabled request type.
 *
 * Only entries to add/update/delete need to be included.
 * Existing SendEnabled entries that are not included in this
 * message are left unchanged.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgSetSendEnabled {
  $type: "cosmos.bank.v1beta1.MsgSetSendEnabled";
  authority: string;
  /** send_enabled is the list of entries to add or update. */
  sendEnabled: SendEnabled[];
  /**
   * use_default_for is a list of denoms that should use the params.default_send_enabled value.
   * Denoms listed here will have their SendEnabled entries deleted.
   * If a denom is included that doesn't have a SendEnabled entry,
   * it will be ignored.
   */
  useDefaultFor: string[];
}

/**
 * MsgSetSendEnabledResponse defines the Msg/SetSendEnabled response type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgSetSendEnabledResponse {
  $type: "cosmos.bank.v1beta1.MsgSetSendEnabledResponse";
}

function createBaseMsgSetSendEnabled(): MsgSetSendEnabled {
  return { $type: "cosmos.bank.v1beta1.MsgSetSendEnabled", authority: "", sendEnabled: [], useDefaultFor: [] };
}

export const MsgSetSendEnabled = {
  $type: "cosmos.bank.v1beta1.MsgSetSendEnabled" as const,

  encode(message: MsgSetSendEnabled, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.sendEnabled) {
      SendEnabled.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.useDefaultFor) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetSendEnabled {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetSendEnabled();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sendEnabled.push(SendEnabled.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.useDefaultFor.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSetSendEnabled {
    return {
      $type: MsgSetSendEnabled.$type,
      authority: isSet(object.authority) ? String(object.authority) : "",
      sendEnabled: Array.isArray(object?.sendEnabled)
        ? object.sendEnabled.map((e: any) => SendEnabled.fromJSON(e))
        : [],
      useDefaultFor: Array.isArray(object?.useDefaultFor) ? object.useDefaultFor.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: MsgSetSendEnabled): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.sendEnabled?.length) {
      obj.sendEnabled = message.sendEnabled.map((e) => SendEnabled.toJSON(e));
    }
    if (message.useDefaultFor?.length) {
      obj.useDefaultFor = message.useDefaultFor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetSendEnabled>, I>>(base?: I): MsgSetSendEnabled {
    return MsgSetSendEnabled.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetSendEnabled>, I>>(object: I): MsgSetSendEnabled {
    const message = createBaseMsgSetSendEnabled();
    message.authority = object.authority ?? "";
    message.sendEnabled = object.sendEnabled?.map((e) => SendEnabled.fromPartial(e)) || [];
    message.useDefaultFor = object.useDefaultFor?.map((e) => e) || [];
    return message;
  },
};

messageTypeRegistry.set(MsgSetSendEnabled.$type, MsgSetSendEnabled);

function createBaseMsgSetSendEnabledResponse(): MsgSetSendEnabledResponse {
  return { $type: "cosmos.bank.v1beta1.MsgSetSendEnabledResponse" };
}

export const MsgSetSendEnabledResponse = {
  $type: "cosmos.bank.v1beta1.MsgSetSendEnabledResponse" as const,

  encode(_: MsgSetSendEnabledResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetSendEnabledResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetSendEnabledResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgSetSendEnabledResponse {
    return { $type: MsgSetSendEnabledResponse.$type };
  },

  toJSON(_: MsgSetSendEnabledResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetSendEnabledResponse>, I>>(base?: I): MsgSetSendEnabledResponse {
    return MsgSetSendEnabledResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetSendEnabledResponse>, I>>(_: I): MsgSetSendEnabledResponse {
    const message = createBaseMsgSetSendEnabledResponse();
    return message;
  },
};

messageTypeRegistry.set(MsgSetSendEnabledResponse.$type, MsgSetSendEnabledResponse);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
