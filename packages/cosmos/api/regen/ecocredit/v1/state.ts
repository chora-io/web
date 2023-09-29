/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { messageTypeRegistry } from "../../../typeRegistry";

export const protobufPackage = "regen.ecocredit.v1";

/**
 * CreditType defines the measurement unit/precision of a certain credit type
 * (e.g. carbon, biodiversity...)
 */
export interface CreditType {
  $type: "regen.ecocredit.v1.CreditType";
  /**
   * abbreviation is a 1-3 character uppercase abbreviation of the CreditType
   * name, used in batch denominations within the CreditType. It must be unique.
   */
  abbreviation: string;
  /** name is the name of the credit type (e.g. carbon, biodiversity). */
  name: string;
  /** unit is the measurement unit of the credit type (e.g. kg, ton). */
  unit: string;
  /** precision is the decimal precision of the credit type. */
  precision: number;
}

function createBaseCreditType(): CreditType {
  return { $type: "regen.ecocredit.v1.CreditType", abbreviation: "", name: "", unit: "", precision: 0 };
}

export const CreditType = {
  $type: "regen.ecocredit.v1.CreditType" as const,

  encode(message: CreditType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.abbreviation !== "") {
      writer.uint32(10).string(message.abbreviation);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.unit !== "") {
      writer.uint32(26).string(message.unit);
    }
    if (message.precision !== 0) {
      writer.uint32(32).uint32(message.precision);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreditType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreditType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.abbreviation = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.unit = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.precision = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreditType {
    return {
      $type: CreditType.$type,
      abbreviation: isSet(object.abbreviation) ? String(object.abbreviation) : "",
      name: isSet(object.name) ? String(object.name) : "",
      unit: isSet(object.unit) ? String(object.unit) : "",
      precision: isSet(object.precision) ? Number(object.precision) : 0,
    };
  },

  toJSON(message: CreditType): unknown {
    const obj: any = {};
    if (message.abbreviation !== "") {
      obj.abbreviation = message.abbreviation;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.unit !== "") {
      obj.unit = message.unit;
    }
    if (message.precision !== 0) {
      obj.precision = Math.round(message.precision);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreditType>, I>>(base?: I): CreditType {
    return CreditType.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreditType>, I>>(object: I): CreditType {
    const message = createBaseCreditType();
    message.abbreviation = object.abbreviation ?? "";
    message.name = object.name ?? "";
    message.unit = object.unit ?? "";
    message.precision = object.precision ?? 0;
    return message;
  },
};

messageTypeRegistry.set(CreditType.$type, CreditType);

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
