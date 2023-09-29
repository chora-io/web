/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../../typeRegistry";

export const protobufPackage = "chora.geonode.v1";

/** MsgCreate is the Msg/Create request type. */
export interface MsgCreate {
  $type: "chora.geonode.v1.MsgCreate";
  /** curator is the address of the node curator. */
  curator: string;
  /** metadata is the metadata of the node. */
  metadata: string;
}

/** MsgUpdateCurator is the Msg/UpdateCurator request type. */
export interface MsgUpdateCurator {
  $type: "chora.geonode.v1.MsgUpdateCurator";
  /** id is the unique identifier of the node. */
  id: Long;
  /** curator is the address of the node curator. */
  curator: string;
  /** new_curator is the address of the new curator. */
  newCurator: string;
}

/** MsgUpdateMetadata is the Msg/UpdateMetadata request type. */
export interface MsgUpdateMetadata {
  $type: "chora.geonode.v1.MsgUpdateMetadata";
  /** id is the unique identifier of the node. */
  id: Long;
  /** curator is the address of the node curator. */
  curator: string;
  /** new_metadata is the new metadata of the node. */
  newMetadata: string;
}

function createBaseMsgCreate(): MsgCreate {
  return { $type: "chora.geonode.v1.MsgCreate", curator: "", metadata: "" };
}

export const MsgCreate = {
  $type: "chora.geonode.v1.MsgCreate" as const,

  encode(message: MsgCreate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.curator !== "") {
      writer.uint32(10).string(message.curator);
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

          message.curator = reader.string();
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
      curator: isSet(object.curator) ? String(object.curator) : "",
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
    };
  },

  toJSON(message: MsgCreate): unknown {
    const obj: any = {};
    if (message.curator !== "") {
      obj.curator = message.curator;
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
    message.curator = object.curator ?? "";
    message.metadata = object.metadata ?? "";
    return message;
  },
};

messageTypeRegistry.set(MsgCreate.$type, MsgCreate);

function createBaseMsgUpdateCurator(): MsgUpdateCurator {
  return { $type: "chora.geonode.v1.MsgUpdateCurator", id: Long.UZERO, curator: "", newCurator: "" };
}

export const MsgUpdateCurator = {
  $type: "chora.geonode.v1.MsgUpdateCurator" as const,

  encode(message: MsgUpdateCurator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.curator !== "") {
      writer.uint32(18).string(message.curator);
    }
    if (message.newCurator !== "") {
      writer.uint32(26).string(message.newCurator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateCurator {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateCurator();
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

          message.curator = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.newCurator = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateCurator {
    return {
      $type: MsgUpdateCurator.$type,
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      curator: isSet(object.curator) ? String(object.curator) : "",
      newCurator: isSet(object.newCurator) ? String(object.newCurator) : "",
    };
  },

  toJSON(message: MsgUpdateCurator): unknown {
    const obj: any = {};
    if (!message.id.isZero()) {
      obj.id = (message.id || Long.UZERO).toString();
    }
    if (message.curator !== "") {
      obj.curator = message.curator;
    }
    if (message.newCurator !== "") {
      obj.newCurator = message.newCurator;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateCurator>, I>>(base?: I): MsgUpdateCurator {
    return MsgUpdateCurator.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateCurator>, I>>(object: I): MsgUpdateCurator {
    const message = createBaseMsgUpdateCurator();
    message.id = (object.id !== undefined && object.id !== null) ? Long.fromValue(object.id) : Long.UZERO;
    message.curator = object.curator ?? "";
    message.newCurator = object.newCurator ?? "";
    return message;
  },
};

messageTypeRegistry.set(MsgUpdateCurator.$type, MsgUpdateCurator);

function createBaseMsgUpdateMetadata(): MsgUpdateMetadata {
  return { $type: "chora.geonode.v1.MsgUpdateMetadata", id: Long.UZERO, curator: "", newMetadata: "" };
}

export const MsgUpdateMetadata = {
  $type: "chora.geonode.v1.MsgUpdateMetadata" as const,

  encode(message: MsgUpdateMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.curator !== "") {
      writer.uint32(18).string(message.curator);
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

          message.curator = reader.string();
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
      curator: isSet(object.curator) ? String(object.curator) : "",
      newMetadata: isSet(object.newMetadata) ? String(object.newMetadata) : "",
    };
  },

  toJSON(message: MsgUpdateMetadata): unknown {
    const obj: any = {};
    if (!message.id.isZero()) {
      obj.id = (message.id || Long.UZERO).toString();
    }
    if (message.curator !== "") {
      obj.curator = message.curator;
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
    message.curator = object.curator ?? "";
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
