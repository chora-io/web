/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../../typeRegistry";

export const protobufPackage = "regen.data.v1";

/** DigestAlgorithm is the hash digest algorithm */
export enum DigestAlgorithm {
  /** DIGEST_ALGORITHM_UNSPECIFIED - unspecified and invalid */
  DIGEST_ALGORITHM_UNSPECIFIED = 0,
  /** DIGEST_ALGORITHM_BLAKE2B_256 - BLAKE2b-256 */
  DIGEST_ALGORITHM_BLAKE2B_256 = 1,
  UNRECOGNIZED = -1,
}

export function digestAlgorithmFromJSON(object: any): DigestAlgorithm {
  switch (object) {
    case 0:
    case "DIGEST_ALGORITHM_UNSPECIFIED":
      return DigestAlgorithm.DIGEST_ALGORITHM_UNSPECIFIED;
    case 1:
    case "DIGEST_ALGORITHM_BLAKE2B_256":
      return DigestAlgorithm.DIGEST_ALGORITHM_BLAKE2B_256;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DigestAlgorithm.UNRECOGNIZED;
  }
}

export function digestAlgorithmToJSON(object: DigestAlgorithm): string {
  switch (object) {
    case DigestAlgorithm.DIGEST_ALGORITHM_UNSPECIFIED:
      return "DIGEST_ALGORITHM_UNSPECIFIED";
    case DigestAlgorithm.DIGEST_ALGORITHM_BLAKE2B_256:
      return "DIGEST_ALGORITHM_BLAKE2B_256";
    case DigestAlgorithm.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** RawMediaType defines MIME media types to be used with a ContentHash.Raw hash. */
export enum RawMediaType {
  /** RAW_MEDIA_TYPE_UNSPECIFIED - RAW_MEDIA_TYPE_UNSPECIFIED can be used for raw binary data */
  RAW_MEDIA_TYPE_UNSPECIFIED = 0,
  /** RAW_MEDIA_TYPE_TEXT_PLAIN - plain text */
  RAW_MEDIA_TYPE_TEXT_PLAIN = 1,
  /** RAW_MEDIA_TYPE_JSON - JSON */
  RAW_MEDIA_TYPE_JSON = 2,
  /** RAW_MEDIA_TYPE_CSV - CSV */
  RAW_MEDIA_TYPE_CSV = 3,
  /** RAW_MEDIA_TYPE_XML - XML */
  RAW_MEDIA_TYPE_XML = 4,
  /** RAW_MEDIA_TYPE_PDF - PDF */
  RAW_MEDIA_TYPE_PDF = 5,
  /** RAW_MEDIA_TYPE_TIFF - TIIF */
  RAW_MEDIA_TYPE_TIFF = 16,
  /** RAW_MEDIA_TYPE_JPG - JPG */
  RAW_MEDIA_TYPE_JPG = 17,
  /** RAW_MEDIA_TYPE_PNG - PNG */
  RAW_MEDIA_TYPE_PNG = 18,
  /** RAW_MEDIA_TYPE_SVG - SVG */
  RAW_MEDIA_TYPE_SVG = 19,
  /** RAW_MEDIA_TYPE_WEBP - WEBP */
  RAW_MEDIA_TYPE_WEBP = 20,
  /** RAW_MEDIA_TYPE_AVIF - AVIF */
  RAW_MEDIA_TYPE_AVIF = 21,
  /** RAW_MEDIA_TYPE_GIF - GIF */
  RAW_MEDIA_TYPE_GIF = 22,
  /** RAW_MEDIA_TYPE_APNG - APNG */
  RAW_MEDIA_TYPE_APNG = 23,
  /** RAW_MEDIA_TYPE_MPEG - MPEG */
  RAW_MEDIA_TYPE_MPEG = 32,
  /** RAW_MEDIA_TYPE_MP4 - MP4 */
  RAW_MEDIA_TYPE_MP4 = 33,
  /** RAW_MEDIA_TYPE_WEBM - WEBM */
  RAW_MEDIA_TYPE_WEBM = 34,
  /** RAW_MEDIA_TYPE_OGG - OGG */
  RAW_MEDIA_TYPE_OGG = 35,
  UNRECOGNIZED = -1,
}

export function rawMediaTypeFromJSON(object: any): RawMediaType {
  switch (object) {
    case 0:
    case "RAW_MEDIA_TYPE_UNSPECIFIED":
      return RawMediaType.RAW_MEDIA_TYPE_UNSPECIFIED;
    case 1:
    case "RAW_MEDIA_TYPE_TEXT_PLAIN":
      return RawMediaType.RAW_MEDIA_TYPE_TEXT_PLAIN;
    case 2:
    case "RAW_MEDIA_TYPE_JSON":
      return RawMediaType.RAW_MEDIA_TYPE_JSON;
    case 3:
    case "RAW_MEDIA_TYPE_CSV":
      return RawMediaType.RAW_MEDIA_TYPE_CSV;
    case 4:
    case "RAW_MEDIA_TYPE_XML":
      return RawMediaType.RAW_MEDIA_TYPE_XML;
    case 5:
    case "RAW_MEDIA_TYPE_PDF":
      return RawMediaType.RAW_MEDIA_TYPE_PDF;
    case 16:
    case "RAW_MEDIA_TYPE_TIFF":
      return RawMediaType.RAW_MEDIA_TYPE_TIFF;
    case 17:
    case "RAW_MEDIA_TYPE_JPG":
      return RawMediaType.RAW_MEDIA_TYPE_JPG;
    case 18:
    case "RAW_MEDIA_TYPE_PNG":
      return RawMediaType.RAW_MEDIA_TYPE_PNG;
    case 19:
    case "RAW_MEDIA_TYPE_SVG":
      return RawMediaType.RAW_MEDIA_TYPE_SVG;
    case 20:
    case "RAW_MEDIA_TYPE_WEBP":
      return RawMediaType.RAW_MEDIA_TYPE_WEBP;
    case 21:
    case "RAW_MEDIA_TYPE_AVIF":
      return RawMediaType.RAW_MEDIA_TYPE_AVIF;
    case 22:
    case "RAW_MEDIA_TYPE_GIF":
      return RawMediaType.RAW_MEDIA_TYPE_GIF;
    case 23:
    case "RAW_MEDIA_TYPE_APNG":
      return RawMediaType.RAW_MEDIA_TYPE_APNG;
    case 32:
    case "RAW_MEDIA_TYPE_MPEG":
      return RawMediaType.RAW_MEDIA_TYPE_MPEG;
    case 33:
    case "RAW_MEDIA_TYPE_MP4":
      return RawMediaType.RAW_MEDIA_TYPE_MP4;
    case 34:
    case "RAW_MEDIA_TYPE_WEBM":
      return RawMediaType.RAW_MEDIA_TYPE_WEBM;
    case 35:
    case "RAW_MEDIA_TYPE_OGG":
      return RawMediaType.RAW_MEDIA_TYPE_OGG;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RawMediaType.UNRECOGNIZED;
  }
}

export function rawMediaTypeToJSON(object: RawMediaType): string {
  switch (object) {
    case RawMediaType.RAW_MEDIA_TYPE_UNSPECIFIED:
      return "RAW_MEDIA_TYPE_UNSPECIFIED";
    case RawMediaType.RAW_MEDIA_TYPE_TEXT_PLAIN:
      return "RAW_MEDIA_TYPE_TEXT_PLAIN";
    case RawMediaType.RAW_MEDIA_TYPE_JSON:
      return "RAW_MEDIA_TYPE_JSON";
    case RawMediaType.RAW_MEDIA_TYPE_CSV:
      return "RAW_MEDIA_TYPE_CSV";
    case RawMediaType.RAW_MEDIA_TYPE_XML:
      return "RAW_MEDIA_TYPE_XML";
    case RawMediaType.RAW_MEDIA_TYPE_PDF:
      return "RAW_MEDIA_TYPE_PDF";
    case RawMediaType.RAW_MEDIA_TYPE_TIFF:
      return "RAW_MEDIA_TYPE_TIFF";
    case RawMediaType.RAW_MEDIA_TYPE_JPG:
      return "RAW_MEDIA_TYPE_JPG";
    case RawMediaType.RAW_MEDIA_TYPE_PNG:
      return "RAW_MEDIA_TYPE_PNG";
    case RawMediaType.RAW_MEDIA_TYPE_SVG:
      return "RAW_MEDIA_TYPE_SVG";
    case RawMediaType.RAW_MEDIA_TYPE_WEBP:
      return "RAW_MEDIA_TYPE_WEBP";
    case RawMediaType.RAW_MEDIA_TYPE_AVIF:
      return "RAW_MEDIA_TYPE_AVIF";
    case RawMediaType.RAW_MEDIA_TYPE_GIF:
      return "RAW_MEDIA_TYPE_GIF";
    case RawMediaType.RAW_MEDIA_TYPE_APNG:
      return "RAW_MEDIA_TYPE_APNG";
    case RawMediaType.RAW_MEDIA_TYPE_MPEG:
      return "RAW_MEDIA_TYPE_MPEG";
    case RawMediaType.RAW_MEDIA_TYPE_MP4:
      return "RAW_MEDIA_TYPE_MP4";
    case RawMediaType.RAW_MEDIA_TYPE_WEBM:
      return "RAW_MEDIA_TYPE_WEBM";
    case RawMediaType.RAW_MEDIA_TYPE_OGG:
      return "RAW_MEDIA_TYPE_OGG";
    case RawMediaType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** GraphCanonicalizationAlgorithm is the graph canonicalization algorithm */
export enum GraphCanonicalizationAlgorithm {
  /** GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED - unspecified and invalid */
  GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED = 0,
  /** GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015 - URDNA2015 graph hashing */
  GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015 = 1,
  UNRECOGNIZED = -1,
}

export function graphCanonicalizationAlgorithmFromJSON(object: any): GraphCanonicalizationAlgorithm {
  switch (object) {
    case 0:
    case "GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED":
      return GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED;
    case 1:
    case "GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015":
      return GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GraphCanonicalizationAlgorithm.UNRECOGNIZED;
  }
}

export function graphCanonicalizationAlgorithmToJSON(object: GraphCanonicalizationAlgorithm): string {
  switch (object) {
    case GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED:
      return "GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED";
    case GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015:
      return "GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015";
    case GraphCanonicalizationAlgorithm.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** GraphMerkleTree is the graph merkle tree type used for hashing, if any */
export enum GraphMerkleTree {
  /** GRAPH_MERKLE_TREE_NONE_UNSPECIFIED - unspecified and valid */
  GRAPH_MERKLE_TREE_NONE_UNSPECIFIED = 0,
  UNRECOGNIZED = -1,
}

export function graphMerkleTreeFromJSON(object: any): GraphMerkleTree {
  switch (object) {
    case 0:
    case "GRAPH_MERKLE_TREE_NONE_UNSPECIFIED":
      return GraphMerkleTree.GRAPH_MERKLE_TREE_NONE_UNSPECIFIED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GraphMerkleTree.UNRECOGNIZED;
  }
}

export function graphMerkleTreeToJSON(object: GraphMerkleTree): string {
  switch (object) {
    case GraphMerkleTree.GRAPH_MERKLE_TREE_NONE_UNSPECIFIED:
      return "GRAPH_MERKLE_TREE_NONE_UNSPECIFIED";
    case GraphMerkleTree.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** ContentHash specifies a hash-based content identifier for a piece of data. */
export interface ContentHash {
  $type: "regen.data.v1.ContentHash";
  /**
   * Raw specifies "raw" data which does not specify a deterministic, canonical
   * encoding. Users of these hashes MUST maintain a copy of the hashed data
   * which is preserved bit by bit. All other content encodings specify a
   * deterministic, canonical encoding allowing implementations to choose from a
   * variety of alternative formats for transport and encoding while maintaining
   * the guarantee that the canonical hash will not change. The media type for
   * "raw" data is defined by the MediaType enum.
   */
  raw?:
    | ContentHash_Raw
    | undefined;
  /**
   * Graph specifies graph data that conforms to the RDF data model.
   * The canonicalization algorithm used for an RDF graph is specified by
   * GraphCanonicalizationAlgorithm.
   */
  graph?: ContentHash_Graph | undefined;
}

/** Raw is the content hash type used for raw data. */
export interface ContentHash_Raw {
  $type: "regen.data.v1.ContentHash.Raw";
  /**
   * hash represents the hash of the data based on the specified
   * digest_algorithm.
   */
  hash: Uint8Array;
  /** digest_algorithm represents the hash digest algorithm. */
  digestAlgorithm: DigestAlgorithm;
  /** media_type represents the media type for raw data. */
  mediaType: RawMediaType;
}

/** Graph is the content hash type used for RDF graph data. */
export interface ContentHash_Graph {
  $type: "regen.data.v1.ContentHash.Graph";
  /**
   * hash represents the hash of the data based on the specified
   * digest_algorithm.
   */
  hash: Uint8Array;
  /** digest_algorithm represents the hash digest algorithm. */
  digestAlgorithm: DigestAlgorithm;
  /**
   * graph_canonicalization_algorithm represents the RDF graph
   * canonicalization algorithm.
   */
  canonicalizationAlgorithm: GraphCanonicalizationAlgorithm;
  /** merkle_tree is the merkle tree type used for the graph hash, if any. */
  merkleTree: GraphMerkleTree;
}

function createBaseContentHash(): ContentHash {
  return { $type: "regen.data.v1.ContentHash", raw: undefined, graph: undefined };
}

export const ContentHash = {
  $type: "regen.data.v1.ContentHash" as const,

  encode(message: ContentHash, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.raw !== undefined) {
      ContentHash_Raw.encode(message.raw, writer.uint32(10).fork()).ldelim();
    }
    if (message.graph !== undefined) {
      ContentHash_Graph.encode(message.graph, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContentHash {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContentHash();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.raw = ContentHash_Raw.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.graph = ContentHash_Graph.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ContentHash {
    return {
      $type: ContentHash.$type,
      raw: isSet(object.raw) ? ContentHash_Raw.fromJSON(object.raw) : undefined,
      graph: isSet(object.graph) ? ContentHash_Graph.fromJSON(object.graph) : undefined,
    };
  },

  toJSON(message: ContentHash): unknown {
    const obj: any = {};
    if (message.raw !== undefined) {
      obj.raw = ContentHash_Raw.toJSON(message.raw);
    }
    if (message.graph !== undefined) {
      obj.graph = ContentHash_Graph.toJSON(message.graph);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ContentHash>, I>>(base?: I): ContentHash {
    return ContentHash.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ContentHash>, I>>(object: I): ContentHash {
    const message = createBaseContentHash();
    message.raw = (object.raw !== undefined && object.raw !== null)
      ? ContentHash_Raw.fromPartial(object.raw)
      : undefined;
    message.graph = (object.graph !== undefined && object.graph !== null)
      ? ContentHash_Graph.fromPartial(object.graph)
      : undefined;
    return message;
  },
};

messageTypeRegistry.set(ContentHash.$type, ContentHash);

function createBaseContentHash_Raw(): ContentHash_Raw {
  return { $type: "regen.data.v1.ContentHash.Raw", hash: new Uint8Array(0), digestAlgorithm: 0, mediaType: 0 };
}

export const ContentHash_Raw = {
  $type: "regen.data.v1.ContentHash.Raw" as const,

  encode(message: ContentHash_Raw, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.digestAlgorithm !== 0) {
      writer.uint32(16).int32(message.digestAlgorithm);
    }
    if (message.mediaType !== 0) {
      writer.uint32(24).int32(message.mediaType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContentHash_Raw {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContentHash_Raw();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hash = reader.bytes();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.digestAlgorithm = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.mediaType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ContentHash_Raw {
    return {
      $type: ContentHash_Raw.$type,
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
      digestAlgorithm: isSet(object.digestAlgorithm) ? digestAlgorithmFromJSON(object.digestAlgorithm) : 0,
      mediaType: isSet(object.mediaType) ? rawMediaTypeFromJSON(object.mediaType) : 0,
    };
  },

  toJSON(message: ContentHash_Raw): unknown {
    const obj: any = {};
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    if (message.digestAlgorithm !== 0) {
      obj.digestAlgorithm = digestAlgorithmToJSON(message.digestAlgorithm);
    }
    if (message.mediaType !== 0) {
      obj.mediaType = rawMediaTypeToJSON(message.mediaType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ContentHash_Raw>, I>>(base?: I): ContentHash_Raw {
    return ContentHash_Raw.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ContentHash_Raw>, I>>(object: I): ContentHash_Raw {
    const message = createBaseContentHash_Raw();
    message.hash = object.hash ?? new Uint8Array(0);
    message.digestAlgorithm = object.digestAlgorithm ?? 0;
    message.mediaType = object.mediaType ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ContentHash_Raw.$type, ContentHash_Raw);

function createBaseContentHash_Graph(): ContentHash_Graph {
  return {
    $type: "regen.data.v1.ContentHash.Graph",
    hash: new Uint8Array(0),
    digestAlgorithm: 0,
    canonicalizationAlgorithm: 0,
    merkleTree: 0,
  };
}

export const ContentHash_Graph = {
  $type: "regen.data.v1.ContentHash.Graph" as const,

  encode(message: ContentHash_Graph, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.digestAlgorithm !== 0) {
      writer.uint32(16).int32(message.digestAlgorithm);
    }
    if (message.canonicalizationAlgorithm !== 0) {
      writer.uint32(24).int32(message.canonicalizationAlgorithm);
    }
    if (message.merkleTree !== 0) {
      writer.uint32(32).int32(message.merkleTree);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContentHash_Graph {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContentHash_Graph();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hash = reader.bytes();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.digestAlgorithm = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.canonicalizationAlgorithm = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.merkleTree = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ContentHash_Graph {
    return {
      $type: ContentHash_Graph.$type,
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
      digestAlgorithm: isSet(object.digestAlgorithm) ? digestAlgorithmFromJSON(object.digestAlgorithm) : 0,
      canonicalizationAlgorithm: isSet(object.canonicalizationAlgorithm)
        ? graphCanonicalizationAlgorithmFromJSON(object.canonicalizationAlgorithm)
        : 0,
      merkleTree: isSet(object.merkleTree) ? graphMerkleTreeFromJSON(object.merkleTree) : 0,
    };
  },

  toJSON(message: ContentHash_Graph): unknown {
    const obj: any = {};
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    if (message.digestAlgorithm !== 0) {
      obj.digestAlgorithm = digestAlgorithmToJSON(message.digestAlgorithm);
    }
    if (message.canonicalizationAlgorithm !== 0) {
      obj.canonicalizationAlgorithm = graphCanonicalizationAlgorithmToJSON(message.canonicalizationAlgorithm);
    }
    if (message.merkleTree !== 0) {
      obj.merkleTree = graphMerkleTreeToJSON(message.merkleTree);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ContentHash_Graph>, I>>(base?: I): ContentHash_Graph {
    return ContentHash_Graph.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ContentHash_Graph>, I>>(object: I): ContentHash_Graph {
    const message = createBaseContentHash_Graph();
    message.hash = object.hash ?? new Uint8Array(0);
    message.digestAlgorithm = object.digestAlgorithm ?? 0;
    message.canonicalizationAlgorithm = object.canonicalizationAlgorithm ?? 0;
    message.merkleTree = object.merkleTree ?? 0;
    return message;
  },
};

messageTypeRegistry.set(ContentHash_Graph.$type, ContentHash_Graph);

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
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
