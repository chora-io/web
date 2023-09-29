/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../../typeRegistry";
import { ContentHash, ContentHash_Graph } from "./types";

export const protobufPackage = "regen.data.v1";

/** MsgAnchor is the Msg/Anchor request type. */
export interface MsgAnchor {
  $type: "regen.data.v1.MsgAnchor";
  /**
   * sender is the address of the sender of the transaction. The sender in
   * Anchor is not attesting to the veracity of the underlying data. They
   * can simply be an intermediary providing services.
   */
  sender: string;
  /** content_hash is the content hash for the data to anchor. */
  contentHash?: ContentHash | undefined;
}

/** MsgAttest is the Msg/Attest request type. */
export interface MsgAttest {
  $type: "regen.data.v1.MsgAttest";
  /**
   * attestor is the addresses of the account attesting to the veracity of the
   * data. By making an Attest request, the attestor is attesting to the
   * veracity of the data referenced by the IRI. The precise meaning of this may
   * vary depending on the underlying data.
   */
  attestor: string;
  /**
   * content_hashes are the content hashes for anchored data. Only RDF graph
   * data can be signed as its data model is intended to specifically convey
   * semantic meaning.
   */
  contentHashes: ContentHash_Graph[];
}

/** MsgDefineResolver is the Msg/DefineResolver request type. */
export interface MsgDefineResolver {
  $type: "regen.data.v1.MsgDefineResolver";
  /**
   * manager is the address of the resolver manager. The manager is able
   * to make future calls using the ID returned by this operation with
   * Msg/RegisterResolver. To authorize other accounts to register resolvers,
   * the manager should make use of cosmos.authz.
   */
  manager: string;
  /**
   * resolver_url is a resolver URL which should refer to an HTTP service
   * which will respond to a GET request with the IRI of a ContentHash
   * and return the content if it exists or a 404. For graph data, resolvers
   * should use the HTTP Accept header to negotiate the RDF serialization
   * format.
   */
  resolverUrl: string;
}

/** MsgRegisterResolver is the Msg/RegisterResolver request type. */
export interface MsgRegisterResolver {
  $type: "regen.data.v1.MsgRegisterResolver";
  /**
   * manager is the address of the resolver manager who registered this
   * resolver with Msg/DefinedResolver.
   */
  manager: string;
  /** resolver_id is the ID of a resolver defined with Msg/DefineResolver. */
  resolverId: Long;
  /**
   * content_hashes is a list of content hashes which the resolver claims to
   * serve.
   */
  contentHashes: ContentHash[];
}

function createBaseMsgAnchor(): MsgAnchor {
  return { $type: "regen.data.v1.MsgAnchor", sender: "", contentHash: undefined };
}

export const MsgAnchor = {
  $type: "regen.data.v1.MsgAnchor" as const,

  encode(message: MsgAnchor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.contentHash !== undefined) {
      ContentHash.encode(message.contentHash, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAnchor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAnchor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.contentHash = ContentHash.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAnchor {
    return {
      $type: MsgAnchor.$type,
      sender: isSet(object.sender) ? String(object.sender) : "",
      contentHash: isSet(object.contentHash) ? ContentHash.fromJSON(object.contentHash) : undefined,
    };
  },

  toJSON(message: MsgAnchor): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.contentHash !== undefined) {
      obj.contentHash = ContentHash.toJSON(message.contentHash);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAnchor>, I>>(base?: I): MsgAnchor {
    return MsgAnchor.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAnchor>, I>>(object: I): MsgAnchor {
    const message = createBaseMsgAnchor();
    message.sender = object.sender ?? "";
    message.contentHash = (object.contentHash !== undefined && object.contentHash !== null)
      ? ContentHash.fromPartial(object.contentHash)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(MsgAnchor.$type, MsgAnchor);

function createBaseMsgAttest(): MsgAttest {
  return { $type: "regen.data.v1.MsgAttest", attestor: "", contentHashes: [] };
}

export const MsgAttest = {
  $type: "regen.data.v1.MsgAttest" as const,

  encode(message: MsgAttest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.attestor !== "") {
      writer.uint32(10).string(message.attestor);
    }
    for (const v of message.contentHashes) {
      ContentHash_Graph.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAttest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAttest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.attestor = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.contentHashes.push(ContentHash_Graph.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAttest {
    return {
      $type: MsgAttest.$type,
      attestor: isSet(object.attestor) ? String(object.attestor) : "",
      contentHashes: Array.isArray(object?.contentHashes)
        ? object.contentHashes.map((e: any) => ContentHash_Graph.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgAttest): unknown {
    const obj: any = {};
    if (message.attestor !== "") {
      obj.attestor = message.attestor;
    }
    if (message.contentHashes?.length) {
      obj.contentHashes = message.contentHashes.map((e) => ContentHash_Graph.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAttest>, I>>(base?: I): MsgAttest {
    return MsgAttest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAttest>, I>>(object: I): MsgAttest {
    const message = createBaseMsgAttest();
    message.attestor = object.attestor ?? "";
    message.contentHashes = object.contentHashes?.map((e) => ContentHash_Graph.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(MsgAttest.$type, MsgAttest);

function createBaseMsgDefineResolver(): MsgDefineResolver {
  return { $type: "regen.data.v1.MsgDefineResolver", manager: "", resolverUrl: "" };
}

export const MsgDefineResolver = {
  $type: "regen.data.v1.MsgDefineResolver" as const,

  encode(message: MsgDefineResolver, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.manager !== "") {
      writer.uint32(10).string(message.manager);
    }
    if (message.resolverUrl !== "") {
      writer.uint32(18).string(message.resolverUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDefineResolver {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDefineResolver();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.manager = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.resolverUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgDefineResolver {
    return {
      $type: MsgDefineResolver.$type,
      manager: isSet(object.manager) ? String(object.manager) : "",
      resolverUrl: isSet(object.resolverUrl) ? String(object.resolverUrl) : "",
    };
  },

  toJSON(message: MsgDefineResolver): unknown {
    const obj: any = {};
    if (message.manager !== "") {
      obj.manager = message.manager;
    }
    if (message.resolverUrl !== "") {
      obj.resolverUrl = message.resolverUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgDefineResolver>, I>>(base?: I): MsgDefineResolver {
    return MsgDefineResolver.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgDefineResolver>, I>>(object: I): MsgDefineResolver {
    const message = createBaseMsgDefineResolver();
    message.manager = object.manager ?? "";
    message.resolverUrl = object.resolverUrl ?? "";
    return message;
  },
};

messageTypeRegistry.set(MsgDefineResolver.$type, MsgDefineResolver);

function createBaseMsgRegisterResolver(): MsgRegisterResolver {
  return { $type: "regen.data.v1.MsgRegisterResolver", manager: "", resolverId: Long.UZERO, contentHashes: [] };
}

export const MsgRegisterResolver = {
  $type: "regen.data.v1.MsgRegisterResolver" as const,

  encode(message: MsgRegisterResolver, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.manager !== "") {
      writer.uint32(10).string(message.manager);
    }
    if (!message.resolverId.isZero()) {
      writer.uint32(16).uint64(message.resolverId);
    }
    for (const v of message.contentHashes) {
      ContentHash.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterResolver {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterResolver();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.manager = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.resolverId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.contentHashes.push(ContentHash.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRegisterResolver {
    return {
      $type: MsgRegisterResolver.$type,
      manager: isSet(object.manager) ? String(object.manager) : "",
      resolverId: isSet(object.resolverId) ? Long.fromValue(object.resolverId) : Long.UZERO,
      contentHashes: Array.isArray(object?.contentHashes)
        ? object.contentHashes.map((e: any) => ContentHash.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgRegisterResolver): unknown {
    const obj: any = {};
    if (message.manager !== "") {
      obj.manager = message.manager;
    }
    if (!message.resolverId.isZero()) {
      obj.resolverId = (message.resolverId || Long.UZERO).toString();
    }
    if (message.contentHashes?.length) {
      obj.contentHashes = message.contentHashes.map((e) => ContentHash.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRegisterResolver>, I>>(base?: I): MsgRegisterResolver {
    return MsgRegisterResolver.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRegisterResolver>, I>>(object: I): MsgRegisterResolver {
    const message = createBaseMsgRegisterResolver();
    message.manager = object.manager ?? "";
    message.resolverId = (object.resolverId !== undefined && object.resolverId !== null)
      ? Long.fromValue(object.resolverId)
      : Long.UZERO;
    message.contentHashes = object.contentHashes?.map((e) => ContentHash.fromPartial(e)) || [];
    return message;
  },
};

messageTypeRegistry.set(MsgRegisterResolver.$type, MsgRegisterResolver);

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
