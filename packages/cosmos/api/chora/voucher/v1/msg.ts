/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { messageTypeRegistry } from "../../../typeRegistry";

export const protobufPackage = "chora.voucher.v1";

/** MsgCreate is the Msg/Create request type. */
export interface MsgCreate {
  $type: "chora.voucher.v1.MsgCreate";
  /** issuer is the address of the voucher issuer. */
  issuer: string;
  /** metadata is the metadata of the voucher. */
  metadata: string;
}

/** MsgIssue is the Msg/Issue request type. */
export interface MsgIssue {
  $type: "chora.voucher.v1.MsgIssue";
  /** id is the unique identifier of the voucher. */
  id: Long;
  /** issuer is the address of the voucher issuer. */
  issuer: string;
  /** recipient is the address of the recipient. */
  recipient: string;
  /** amount is the amount of vouchers to issue. */
  amount: string;
  /** expiration is the expiration of the vouchers. */
  expiration?:
    | Date
    | undefined;
  /** metadata is the metadata of the issuance. */
  metadata: string;
}

/** MsgUpdateIssuer is the Msg/UpdateIssuer request type. */
export interface MsgUpdateIssuer {
  $type: "chora.voucher.v1.MsgUpdateIssuer";
  /** id is the unique identifier of the voucher. */
  id: Long;
  /** issuer is the address of the voucher issuer. */
  issuer: string;
  /** new_issuer is the address of the new issuer. */
  newIssuer: string;
}

/** MsgUpdateMetadata is the Msg/UpdateMetadata request type. */
export interface MsgUpdateMetadata {
  $type: "chora.voucher.v1.MsgUpdateMetadata";
  /** id is the unique identifier of the voucher. */
  id: Long;
  /** issuer is the address of the voucher issuer. */
  issuer: string;
  /** new_metadata is the new metadata of the voucher. */
  newMetadata: string;
}

function createBaseMsgCreate(): MsgCreate {
  return { $type: "chora.voucher.v1.MsgCreate", issuer: "", metadata: "" };
}

export const MsgCreate = {
  $type: "chora.voucher.v1.MsgCreate" as const,

  encode(message: MsgCreate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.issuer !== "") {
      writer.uint32(10).string(message.issuer);
    }
    if (message.metadata !== "") {
      writer.uint32(18).string(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.issuer = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.metadata = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreate {
    return {
      $type: MsgCreate.$type,
      issuer: isSet(object.issuer) ? String(object.issuer) : "",
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
    };
  },

  toJSON(message: MsgCreate): unknown {
    const obj: any = {};
    if (message.issuer !== "") {
      obj.issuer = message.issuer;
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreate>, I>>(base?: I): MsgCreate {
    return MsgCreate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreate>, I>>(object: I): MsgCreate {
    const message = createBaseMsgCreate();
    message.issuer = object.issuer ?? "";
    message.metadata = object.metadata ?? "";
    return message;
  },
};

messageTypeRegistry.set(MsgCreate.$type, MsgCreate);

function createBaseMsgIssue(): MsgIssue {
  return {
    $type: "chora.voucher.v1.MsgIssue",
    id: Long.UZERO,
    issuer: "",
    recipient: "",
    amount: "",
    expiration: undefined,
    metadata: "",
  };
}

export const MsgIssue = {
  $type: "chora.voucher.v1.MsgIssue" as const,

  encode(message: MsgIssue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.issuer !== "") {
      writer.uint32(18).string(message.issuer);
    }
    if (message.recipient !== "") {
      writer.uint32(26).string(message.recipient);
    }
    if (message.amount !== "") {
      writer.uint32(34).string(message.amount);
    }
    if (message.expiration !== undefined) {
      Timestamp.encode(toTimestamp(message.expiration), writer.uint32(42).fork()).ldelim();
    }
    if (message.metadata !== "") {
      writer.uint32(50).string(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgIssue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIssue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.issuer = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.recipient = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.amount = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.expiration = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.metadata = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgIssue {
    return {
      $type: MsgIssue.$type,
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      issuer: isSet(object.issuer) ? String(object.issuer) : "",
      recipient: isSet(object.recipient) ? String(object.recipient) : "",
      amount: isSet(object.amount) ? String(object.amount) : "",
      expiration: isSet(object.expiration) ? fromJsonTimestamp(object.expiration) : undefined,
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
    };
  },

  toJSON(message: MsgIssue): unknown {
    const obj: any = {};
    if (!message.id.isZero()) {
      obj.id = (message.id || Long.UZERO).toString();
    }
    if (message.issuer !== "") {
      obj.issuer = message.issuer;
    }
    if (message.recipient !== "") {
      obj.recipient = message.recipient;
    }
    if (message.amount !== "") {
      obj.amount = message.amount;
    }
    if (message.expiration !== undefined) {
      obj.expiration = message.expiration.toISOString();
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgIssue>, I>>(base?: I): MsgIssue {
    return MsgIssue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgIssue>, I>>(object: I): MsgIssue {
    const message = createBaseMsgIssue();
    message.id = (object.id !== undefined && object.id !== null) ? Long.fromValue(object.id) : Long.UZERO;
    message.issuer = object.issuer ?? "";
    message.recipient = object.recipient ?? "";
    message.amount = object.amount ?? "";
    message.expiration = object.expiration ?? undefined;
    message.metadata = object.metadata ?? "";
    return message;
  },
};

messageTypeRegistry.set(MsgIssue.$type, MsgIssue);

function createBaseMsgUpdateIssuer(): MsgUpdateIssuer {
  return { $type: "chora.voucher.v1.MsgUpdateIssuer", id: Long.UZERO, issuer: "", newIssuer: "" };
}

export const MsgUpdateIssuer = {
  $type: "chora.voucher.v1.MsgUpdateIssuer" as const,

  encode(message: MsgUpdateIssuer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.issuer !== "") {
      writer.uint32(18).string(message.issuer);
    }
    if (message.newIssuer !== "") {
      writer.uint32(26).string(message.newIssuer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateIssuer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateIssuer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.issuer = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.newIssuer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateIssuer {
    return {
      $type: MsgUpdateIssuer.$type,
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      issuer: isSet(object.issuer) ? String(object.issuer) : "",
      newIssuer: isSet(object.newIssuer) ? String(object.newIssuer) : "",
    };
  },

  toJSON(message: MsgUpdateIssuer): unknown {
    const obj: any = {};
    if (!message.id.isZero()) {
      obj.id = (message.id || Long.UZERO).toString();
    }
    if (message.issuer !== "") {
      obj.issuer = message.issuer;
    }
    if (message.newIssuer !== "") {
      obj.newIssuer = message.newIssuer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateIssuer>, I>>(base?: I): MsgUpdateIssuer {
    return MsgUpdateIssuer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateIssuer>, I>>(object: I): MsgUpdateIssuer {
    const message = createBaseMsgUpdateIssuer();
    message.id = (object.id !== undefined && object.id !== null) ? Long.fromValue(object.id) : Long.UZERO;
    message.issuer = object.issuer ?? "";
    message.newIssuer = object.newIssuer ?? "";
    return message;
  },
};

messageTypeRegistry.set(MsgUpdateIssuer.$type, MsgUpdateIssuer);

function createBaseMsgUpdateMetadata(): MsgUpdateMetadata {
  return { $type: "chora.voucher.v1.MsgUpdateMetadata", id: Long.UZERO, issuer: "", newMetadata: "" };
}

export const MsgUpdateMetadata = {
  $type: "chora.voucher.v1.MsgUpdateMetadata" as const,

  encode(message: MsgUpdateMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.issuer !== "") {
      writer.uint32(18).string(message.issuer);
    }
    if (message.newMetadata !== "") {
      writer.uint32(26).string(message.newMetadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.issuer = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.newMetadata = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateMetadata {
    return {
      $type: MsgUpdateMetadata.$type,
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      issuer: isSet(object.issuer) ? String(object.issuer) : "",
      newMetadata: isSet(object.newMetadata) ? String(object.newMetadata) : "",
    };
  },

  toJSON(message: MsgUpdateMetadata): unknown {
    const obj: any = {};
    if (!message.id.isZero()) {
      obj.id = (message.id || Long.UZERO).toString();
    }
    if (message.issuer !== "") {
      obj.issuer = message.issuer;
    }
    if (message.newMetadata !== "") {
      obj.newMetadata = message.newMetadata;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateMetadata>, I>>(base?: I): MsgUpdateMetadata {
    return MsgUpdateMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateMetadata>, I>>(object: I): MsgUpdateMetadata {
    const message = createBaseMsgUpdateMetadata();
    message.id = (object.id !== undefined && object.id !== null) ? Long.fromValue(object.id) : Long.UZERO;
    message.issuer = object.issuer ?? "";
    message.newMetadata = object.newMetadata ?? "";
    return message;
  },
};

messageTypeRegistry.set(MsgUpdateMetadata.$type, MsgUpdateMetadata);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { $type: "google.protobuf.Timestamp", seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds.toNumber() || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
