import { describe, test, expect } from "vitest";
import {
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isObject,
  isArray,
  isNull,
  isUndefined,
  isNullish,
  isInteger,
  isFloat,
  isPositive,
  isNegative,
  isZero,
  isFinite,
  isInfinite,
  isEmptyString,
  isNonEmptyString,
  isWhitespace,
  isEmail,
  isUrl,
  isEmptyArray,
  isNonEmptyArray,
  hasLength,
  hasMinLength,
  hasMaxLength,
  isEmptyObject,
  isNonEmptyObject,
  hasProperty,
  hasProperties,
  isDate,
  isValidDate,
  isInvalidDate,
  isRegExp,
  isError,
  isTypeError,
  isReferenceError,
  isSyntaxError,
  isPromise,
  isThenable,
  isSymbol,
  isBigInt,
  getType,
  isType,
  isOneOf,
  isInstanceOf,
  isEqual,
  validate,
  createValidator,
  assertString,
  assertNumber,
  assertArray,
  assertObject,
  sign,
} from "../index.js";

describe("Basic Type Checkers", () => {
  test("isString", () => {
    expect(isString("hello")).toBe(true);
    expect(isString("")).toBe(true);
    expect(isString(123)).toBe(false);
    expect(isString(null)).toBe(false);
  });

  test("isNumber", () => {
    // Regular numbers
    expect(isNumber(123)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-123)).toBe(true);
    
    // Non-numbers
    expect(isNumber("123")).toBe(false);
    expect(isNumber(NaN)).toBe(false);
    
    // Edge cases
    expect(isNumber(Infinity)).toBe(false);
    expect(isNumber(-Infinity)).toBe(false);
    expect(isNumber(Number.MAX_VALUE)).toBe(true);
    expect(isNumber(Number.MIN_VALUE)).toBe(true);
  });

  test("isBoolean", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean("true")).toBe(false);
  });

  test("isFunction", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction("function")).toBe(false);
  });

  test("isObject", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
    expect(isObject([])).toBe(false);
    expect(isObject(null)).toBe(false);
  });

  test("isArray", () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray({})).toBe(false);
    expect(isArray("array")).toBe(false);
  });

  test("isNull", () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
    expect(isNull(0)).toBe(false);
  });

  test("isUndefined", () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(0)).toBe(false);
  });

  test("isNullish", () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
    expect(isNullish(0)).toBe(false);
    expect(isNullish("")).toBe(false);
  });
});

describe("Advanced Type Checkers", () => {
  test("isInteger", () => {
    expect(isInteger(123)).toBe(true);
    expect(isInteger(0)).toBe(true);
    expect(isInteger(-123)).toBe(true);
    expect(isInteger(123.45)).toBe(false);
    expect(isInteger("123")).toBe(false);
  });

  test("isFloat", () => {
    expect(isFloat(123.45)).toBe(true);
    expect(isFloat(0.1)).toBe(true);
    expect(isFloat(123)).toBe(false);
    expect(isFloat("123.45")).toBe(false);
  });

  test("isPositive", () => {
    expect(isPositive(123)).toBe(true);
    expect(isPositive(0.1)).toBe(true);
    expect(isPositive(0)).toBe(false);
    expect(isPositive(-123)).toBe(false);
  });

  test("isNegative", () => {
    expect(isNegative(-123)).toBe(true);
    expect(isNegative(-0.1)).toBe(true);
    expect(isNegative(0)).toBe(false);
    expect(isNegative(123)).toBe(false);
  });

  test("isZero", () => {
    expect(isZero(0)).toBe(true);
    expect(isZero(-0)).toBe(true);
    expect(isZero(1)).toBe(false);
  });

  test("isFinite", () => {
    expect(isFinite(123)).toBe(true);
    expect(isFinite(0)).toBe(true);
    expect(isFinite(Infinity)).toBe(false);
    expect(isFinite(-Infinity)).toBe(false);
  });

  test("isInfinite", () => {
    // Positive and negative infinity
    expect(isInfinite(Infinity)).toBe(true);
    expect(isInfinite(-Infinity)).toBe(true);
    
    // Non-infinite values
    expect(isInfinite(123)).toBe(false);
    expect(isInfinite(0)).toBe(false);
    expect(isInfinite(-123)).toBe(false);
    
    // Edge cases
    expect(isInfinite(NaN)).toBe(false);
    expect(isInfinite("Infinity")).toBe(false);
    expect(isInfinite(Number.POSITIVE_INFINITY)).toBe(true);
    expect(isInfinite(Number.NEGATIVE_INFINITY)).toBe(true);
  });
});

describe("String Type Checkers", () => {
  test("isEmptyString", () => {
    expect(isEmptyString("")).toBe(true);
    expect(isEmptyString("hello")).toBe(false);
    expect(isEmptyString(123)).toBe(false);
  });

  test("isNonEmptyString", () => {
    expect(isNonEmptyString("hello")).toBe(true);
    expect(isNonEmptyString("")).toBe(false);
    expect(isNonEmptyString(123)).toBe(false);
  });

  test("isWhitespace", () => {
    expect(isWhitespace("   ")).toBe(true);
    expect(isWhitespace("\t\n")).toBe(true);
    expect(isWhitespace("hello")).toBe(false);
    expect(isWhitespace("")).toBe(true);
  });

  test("isEmail", () => {
    expect(isEmail("test@example.com")).toBe(true);
    expect(isEmail("user.name@domain.co.uk")).toBe(true);
    expect(isEmail("invalid-email")).toBe(false);
    expect(isEmail("@example.com")).toBe(false);
  });

  test("isUrl", () => {
    // Valid URLs
    expect(isUrl("https://example.com")).toBe(true);
    expect(isUrl("http://localhost:3000")).toBe(true);
    expect(isUrl("http://example.com/path?query=value#fragment")).toBe(true);
    expect(isUrl("https://sub.domain.co.uk")).toBe(true);
    
    // Invalid URLs
    expect(isUrl("not-a-url")).toBe(false);
    expect(isUrl("")).toBe(false);
    expect(isUrl("example.com")).toBe(false); // Missing protocol
    expect(isUrl("http://example")).toBe(false); // Missing TLD
    expect(isUrl("javascript:alert('xss')")).toBe(false); // Dangerous protocol
    expect(isUrl("data:text/plain,Hello%20World")).toBe(false); // data: URLs
    expect(isUrl(123)).toBe(false); // Non-string input
    expect(isUrl(null)).toBe(false); // Null input
    expect(isUrl(undefined)).toBe(false); // Undefined input
    
    // Edge cases
    expect(isUrl("http://localhost")).toBe(true); // Localhost without port
    expect(isUrl("http://192.168.1.1")).toBe(true); // IP address
  });
});

describe("Array Type Checkers", () => {
  test("isEmptyArray", () => {
    expect(isEmptyArray([])).toBe(true);
    expect(isEmptyArray([1, 2, 3])).toBe(false);
    expect(isEmptyArray({})).toBe(false);
  });

  test("isNonEmptyArray", () => {
    expect(isNonEmptyArray([1, 2, 3])).toBe(true);
    expect(isNonEmptyArray([])).toBe(false);
    expect(isNonEmptyArray({})).toBe(false);
  });

  test("hasLength", () => {
    expect(hasLength([1, 2, 3], 3)).toBe(true);
    expect(hasLength([], 0)).toBe(true);
    expect(hasLength([1, 2], 3)).toBe(false);
    expect(hasLength({}, 0)).toBe(false);
  });

  test("hasMinLength", () => {
    expect(hasMinLength([1, 2, 3], 2)).toBe(true);
    expect(hasMinLength([1, 2, 3], 3)).toBe(true);
    expect(hasMinLength([1, 2], 3)).toBe(false);
  });

  test("hasMaxLength", () => {
    expect(hasMaxLength([1, 2, 3], 4)).toBe(true);
    expect(hasMaxLength([1, 2, 3], 3)).toBe(true);
    expect(hasMaxLength([1, 2, 3], 2)).toBe(false);
  });
});

describe("Object Type Checkers", () => {
  test("isEmptyObject", () => {
    expect(isEmptyObject({})).toBe(true);
    expect(isEmptyObject({ a: 1 })).toBe(false);
    expect(isEmptyObject([])).toBe(false);
  });

  test("isNonEmptyObject", () => {
    expect(isNonEmptyObject({ a: 1 })).toBe(true);
    expect(isNonEmptyObject({})).toBe(false);
    expect(isNonEmptyObject([])).toBe(false);
  });

  test("hasProperty", () => {
    expect(hasProperty({ a: 1 }, "a")).toBe(true);
    expect(hasProperty({ a: 1 }, "b")).toBe(false);
    expect(hasProperty({ a: 1 }, "toString")).toBe(true);
  });

  test("hasProperties", () => {
    expect(hasProperties({ a: 1, b: 2 }, ["a", "b"])).toBe(true);
    expect(hasProperties({ a: 1 }, ["a", "b"])).toBe(false);
    expect(hasProperties({}, ["a"])).toBe(false);
  });
});

describe("Date Type Checkers", () => {
  test("isDate", () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date("invalid"))).toBe(false);
    expect(isDate("2023-01-01")).toBe(false);
    expect(isDate(1234567890)).toBe(false);
  });

  test("isValidDate", () => {
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate(new Date("2023-01-01"))).toBe(true);
    expect(isValidDate(new Date("invalid"))).toBe(false);
  });

  test("isInvalidDate", () => {
    expect(isInvalidDate(new Date("invalid"))).toBe(true);
    expect(isInvalidDate(new Date())).toBe(false);
  });
});

describe("Other Type Checkers", () => {
  test("isRegExp", () => {
    expect(isRegExp(/test/)).toBe(true);
    expect(isRegExp(new RegExp("test"))).toBe(true);
    expect(isRegExp("test")).toBe(false);
  });

  test("isError", () => {
    expect(isError(new Error())).toBe(true);
    expect(isError(new TypeError())).toBe(true);
    expect(isError("error")).toBe(false);
  });

  test("isTypeError", () => {
    expect(isTypeError(new TypeError())).toBe(true);
    expect(isTypeError(new Error())).toBe(false);
    expect(isTypeError("type error")).toBe(false);
  });

  test("isReferenceError", () => {
    expect(isReferenceError(new ReferenceError())).toBe(true);
    expect(isReferenceError(new Error())).toBe(false);
    expect(isReferenceError("reference error")).toBe(false);
  });

  test("isSyntaxError", () => {
    expect(isSyntaxError(new SyntaxError())).toBe(true);
    expect(isSyntaxError(new Error())).toBe(false);
    expect(isSyntaxError("syntax error")).toBe(false);
  });

  test("isThenable", () => {
    expect(isThenable({ then: () => {} })).toBe(true);
    expect(isThenable(Promise.resolve())).toBe(true);
    expect(isThenable({})).toBe(false);
    expect(isThenable(null)).toBe(false);
    expect(isThenable(undefined)).toBe(false);
    expect(isThenable("string")).toBe(false);
  });

  test("isPromise", () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    expect(isPromise(new Promise(() => {}))).toBe(true);
    expect(isPromise({})).toBe(false);
  });

  test("isSymbol", () => {
    expect(isSymbol(Symbol())).toBe(true);
    expect(isSymbol(Symbol("test"))).toBe(true);
    expect(isSymbol("symbol")).toBe(false);
  });

  test("isBigInt", () => {
    expect(isBigInt(BigInt(123))).toBe(true);
    expect(isBigInt(123n)).toBe(true);
    expect(isBigInt(123)).toBe(false);
  });
});

describe("Utility Functions", () => {
  test("getType", () => {
    expect(getType("hello")).toBe("string");
    expect(getType(123)).toBe("number");
    expect(getType(true)).toBe("boolean");
    expect(getType([])).toBe("array");
    expect(getType({})).toBe("object");
    expect(getType(null)).toBe("null");
    expect(getType(undefined)).toBe("undefined");
    expect(getType(new Date())).toBe("date");
    expect(getType(/test/)).toBe("regexp");
    expect(getType(new Error())).toBe("error");
    expect(getType(Promise.resolve())).toBe("promise");
  });

  test("isType", () => {
    expect(isType("hello", "string")).toBe(true);
    expect(isType(123, "number")).toBe(true);
    expect(isType("hello", "number")).toBe(false);
  });

  test("isOneOf", () => {
    expect(isOneOf("hello", ["string", "number"])).toBe(true);
    expect(isOneOf(123, ["string", "number"])).toBe(true);
    expect(isOneOf(true, ["string", "number"])).toBe(false);
  });

  test("isEqual", () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual("hello", "hello")).toBe(true);
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(isEqual({ a: 1 }, { b: 1 })).toBe(false);
  });

  test("validate", () => {
    const validators = [isString, isNonEmptyString];
    expect(validate("hello", validators)).toBe(true);
    expect(validate("", validators)).toBe(false);
    expect(validate(123, validators)).toBe(false);
  });

  test("createValidator", () => {
    const validator = createValidator([isString, isNonEmptyString]);
    expect(validator("hello")).toBe(true);
    expect(validator("")).toBe(false);
    expect(validator(123)).toBe(false);
  });
});

describe("Type Guards", () => {
  test("assertString", () => {
    expect(() => assertString("hello")).not.toThrow();
    expect(() => assertString(123)).toThrow(TypeError);
    expect(() => assertString(123, "Custom message")).toThrow("Custom message");
  });

  test("assertNumber", () => {
    expect(() => assertNumber(123)).not.toThrow();
    expect(() => assertNumber("123")).toThrow(TypeError);
  });

  test("assertArray", () => {
    expect(() => assertArray([1, 2, 3])).not.toThrow();
    expect(() => assertArray({})).toThrow(TypeError);
  });

  test("assertObject", () => {
    expect(() => assertObject({})).not.toThrow();
    expect(() => assertObject([])).toThrow(TypeError);
  });
});

describe("Sign Function", () => {
  test("returns 1 for positive numbers", () => {
    expect(sign(42)).toBe(1);
    expect(sign(0.1)).toBe(1);
    expect(sign(Infinity)).toBe(1);
  });

  test("returns -1 for negative numbers", () => {
    expect(sign(-42)).toBe(-1);
    expect(sign(-0.1)).toBe(-1);
    expect(sign(-Infinity)).toBe(-1);
  });

  test("handles zero correctly", () => {
    expect(sign(0)).toBe(1);
    expect(sign(-0)).toBe(-1);
  });
});
