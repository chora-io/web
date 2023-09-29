/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { messageTypeRegistry } from "../../../typeRegistry";

export const protobufPackage = "regen.intertx.v1";

/** MsgRegisterAccount defines the payload for Msg/RegisterAccount */
export interface MsgRegisterAccount {
  $type: "regen.intertx.v1.MsgRegisterAccount";
  /** owner is the address of the interchain account owner. */
  owner: string;
  /** connection_id is the connection id string (i.e. channel-5). */
  connectionId: string;
  /**
   * version is the application version string. For example, this could be an
   * ICS27 encoded metadata type or an ICS29 encoded metadata type with a nested
   * application version.
   */
  version: string;
}

/** MsgRegisterAccountResponse defines the response for Msg/RegisterAccount */
export interface MsgRegisterAccountResponse {
  $type: "regen.intertx.v1.MsgRegisterAccountResponse";
}

/** MsgSubmitTx defines the payload for Msg/SubmitTx */
export interface MsgSubmitTx {
  $type: "regen.intertx.v1.MsgSubmitTx";
  /** owner is the owner address of the interchain account. */
  owner: string;
  /** connection_id is the id of the connection. */
  connectionId: string;
  /** msg is the bytes of the transaction msg to send. */
  msg?: Any | undefined;
}

/** MsgSubmitTxResponse defines the response for Msg/SubmitTx */
export interface MsgSubmitTxResponse {
  $type: "regen.intertx.v1.MsgSubmitTxResponse";
}

function createBaseMsgRegisterAccount(): MsgRegisterAccount {
  return { $type: "regen.intertx.v1.MsgRegisterAccount", owner: "", connectionId: "", version: "" };
}

export const MsgRegisterAccount = {
  $type: "regen.intertx.v1.MsgRegisterAccount" as const,

  encode(message: MsgRegisterAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.connectionId !== "") {
      writer.uint32(18).string(message.connectionId);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.connectionId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.version = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRegisterAccount {
    return {
      $type: MsgRegisterAccount.$type,
      owner: isSet(object.owner) ? String(object.owner) : "",
      connectionId: isSet(object.connectionId) ? String(object.connectionId) : "",
      version: isSet(object.version) ? String(object.version) : "",
    };
  },

  toJSON(message: MsgRegisterAccount): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.connectionId !== "") {
      obj.connectionId = message.connectionId;
    }
    if (message.version !== "") {
      obj.version = message.version;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRegisterAccount>, I>>(base?: I): MsgRegisterAccount {
    return MsgRegisterAccount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRegisterAccount>, I>>(object: I): MsgRegisterAccount {
    const message = createBaseMsgRegisterAccount();
    message.owner = object.owner ?? "";
    message.connectionId = object.connectionId ?? "";
    message.version = object.version ?? "";
    return message;
  },
};

messageTypeRegistry.set(MsgRegisterAccount.$type, MsgRegisterAccount);

function createBaseMsgRegisterAccountResponse(): MsgRegisterAccountResponse {
  return { $type: "regen.intertx.v1.MsgRegisterAccountResponse" };
}

export const MsgRegisterAccountResponse = {
  $type: "regen.intertx.v1.MsgRegisterAccountResponse" as const,

  encode(_: MsgRegisterAccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterAccountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterAccountResponse();
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

  fromJSON(_: any): MsgRegisterAccountResponse {
    return { $type: MsgRegisterAccountResponse.$type };
  },

  toJSON(_: MsgRegisterAccountResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRegisterAccountResponse>, I>>(base?: I): MsgRegisterAccountResponse {
    return MsgRegisterAccountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRegisterAccountResponse>, I>>(_: I): MsgRegisterAccountResponse {
    const message = createBaseMsgRegisterAccountResponse();
    return message;
  },
};

messageTypeRegistry.set(MsgRegisterAccountResponse.$type, MsgRegisterAccountResponse);

function createBaseMsgSubmitTx(): MsgSubmitTx {
  return { $type: "regen.intertx.v1.MsgSubmitTx", owner: "", connectionId: "", msg: undefined };
}

export const MsgSubmitTx = {
  $type: "regen.intertx.v1.MsgSubmitTx" as const,

  encode(message: MsgSubmitTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.connectionId !== "") {
      writer.uint32(18).string(message.connectionId);
    }
    if (message.msg !== undefined) {
      Any.encode(message.msg, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitTx {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.connectionId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.msg = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSubmitTx {
    return {
      $type: MsgSubmitTx.$type,
      owner: isSet(object.owner) ? String(object.owner) : "",
      connectionId: isSet(object.connectionId) ? String(object.connectionId) : "",
      msg: isSet(object.msg) ? Any.fromJSON(object.msg) : undefined,
    };
  },

  toJSON(message: MsgSubmitTx): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.connectionId !== "") {
      obj.connectionId = message.connectionId;
    }
    if (message.msg !== undefined) {
      obj.msg = Any.toJSON(message.msg);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSubmitTx>, I>>(base?: I): MsgSubmitTx {
    return MsgSubmitTx.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSubmitTx>, I>>(object: I): MsgSubmitTx {
    const message = createBaseMsgSubmitTx();
    message.owner = object.owner ?? "";
    message.connectionId = object.connectionId ?? "";
    message.msg = (object.msg !== undefined && object.msg !== null) ? Any.fromPartial(object.msg) : undefined;
    return message;
  },
};

messageTypeRegistry.set(MsgSubmitTx.$type, MsgSubmitTx);

function createBaseMsgSubmitTxResponse(): MsgSubmitTxResponse {
  return { $type: "regen.intertx.v1.MsgSubmitTxResponse" };
}

export const MsgSubmitTxResponse = {
  $type: "regen.intertx.v1.MsgSubmitTxResponse" as const,

  encode(_: MsgSubmitTxResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitTxResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitTxResponse();
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

  fromJSON(_: any): MsgSubmitTxResponse {
    return { $type: MsgSubmitTxResponse.$type };
  },

  toJSON(_: MsgSubmitTxResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSubmitTxResponse>, I>>(base?: I): MsgSubmitTxResponse {
    return MsgSubmitTxResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSubmitTxResponse>, I>>(_: I): MsgSubmitTxResponse {
    const message = createBaseMsgSubmitTxResponse();
    return message;
  },
};

messageTypeRegistry.set(MsgSubmitTxResponse.$type, MsgSubmitTxResponse);

/** Msg defines the intertx Msg service. */
export interface Msg {
  /** Register defines a rpc handler for MsgRegisterAccount */
  RegisterAccount(request: MsgRegisterAccount): Promise<MsgRegisterAccountResponse>;
  /** SubmitTx defines a rpc handler for MsgSubmitTx */
  SubmitTx(request: MsgSubmitTx): Promise<MsgSubmitTxResponse>;
}

export const MsgServiceName = "regen.intertx.v1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.RegisterAccount = this.RegisterAccount.bind(this);
    this.SubmitTx = this.SubmitTx.bind(this);
  }
  RegisterAccount(request: MsgRegisterAccount): Promise<MsgRegisterAccountResponse> {
    const data = MsgRegisterAccount.encode(request).finish();
    const promise = this.rpc.request(this.service, "RegisterAccount", data);
    return promise.then((data) => MsgRegisterAccountResponse.decode(_m0.Reader.create(data)));
  }

  SubmitTx(request: MsgSubmitTx): Promise<MsgSubmitTxResponse> {
    const data = MsgSubmitTx.encode(request).finish();
    const promise = this.rpc.request(this.service, "SubmitTx", data);
    return promise.then((data) => MsgSubmitTxResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
