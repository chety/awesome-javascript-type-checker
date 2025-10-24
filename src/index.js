/**
 * Awesome JavaScript Type Checker
 * A comprehensive type checking library for JavaScript
 */

// Basic type checkers
export const isString = (value) => typeof value === 'string';
/**
 * Checks if a value is a finite number.
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is a finite number, false otherwise
 * @example
 * isNumber(123) // returns true
 * isNumber(0) // returns true
 * isNumber(Infinity) // returns false
 * isNumber('123') // returns false
 */
export const isNumber = (value) => 
  typeof value === 'number' && 
  !Number.isNaN(value) && 
  value !== Infinity && 
  value !== -Infinity;
export const isBoolean = (value) => typeof value === 'boolean';
export const isFunction = (value) => typeof value === 'function';
export const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
export const isArray = (value) => Array.isArray(value);
export const isNull = (value) => value === null;
export const isUndefined = (value) => value === undefined;
export const isNullish = (value) => value === null || value === undefined;

// Advanced type checkers
export const isInteger = (value) => Number.isInteger(value);
export const isFloat = (value) => isNumber(value) && !Number.isInteger(value);
export const isPositive = (value) => isNumber(value) && value > 0;
export const isNegative = (value) => isNumber(value) && value < 0;
export const isZero = (value) => value === 0;
export const isFinite = (value) => Number.isFinite(value);
/**
 * Checks if a value is positive or negative infinity.
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is Infinity or -Infinity, false otherwise
 * @example
 * isInfinite(Infinity) // returns true
 * isInfinite(-Infinity) // returns true
 * isInfinite(123) // returns false
 * isInfinite(NaN) // returns false
 */
export const isInfinite = (value) => 
  (value === Infinity || value === -Infinity) && 
  typeof value === 'number';

// String type checkers
export const isEmptyString = (value) => isString(value) && value.length === 0;
export const isNonEmptyString = (value) => isString(value) && value.length > 0;
export const isWhitespace = (value) => isString(value) && /^\s*$/.test(value);
export const isEmail = (value) => isString(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
/**
 * Checks if a string is a valid URL with http, https, or ftp protocol.
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is a valid URL, false otherwise
 * @example
 * isUrl('https://example.com') // returns true
 * isUrl('http://localhost:3000') // returns true
 * isUrl('example.com') // returns false (missing protocol)
 * isUrl('javascript:alert(1)') // returns false (invalid protocol)
 */
export const isUrl = (value) => {
  if (!isString(value)) return false;
  
  try {
    const url = new URL(value);
    const protocol = url.protocol;
    const hostname = url.hostname;
    
    // Check for valid protocols
    if (!['http:', 'https:', 'ftp:'].includes(protocol)) {
      return false;
    }
    
    // Check for valid TLD (top-level domain)
    // This is a basic check - for production, consider a more comprehensive solution
    if (!hostname.includes('.') && hostname !== 'localhost') {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
};

// Array type checkers
export const isEmptyArray = (value) => isArray(value) && value.length === 0;
export const isNonEmptyArray = (value) => isArray(value) && value.length > 0;
export const hasLength = (value, length) => isArray(value) && value.length === length;
export const hasMinLength = (value, minLength) => isArray(value) && value.length >= minLength;
export const hasMaxLength = (value, maxLength) => isArray(value) && value.length <= maxLength;

// Object type checkers
export const isEmptyObject = (value) => isObject(value) && Object.keys(value).length === 0;
export const isNonEmptyObject = (value) => isObject(value) && Object.keys(value).length > 0;
export const hasProperty = (value, prop) => isObject(value) && prop in value;
export const hasProperties = (value, props) => {
  if (!isObject(value)) return false;
  return props.every(prop => prop in value);
};

// Date type checkers
export const isDate = (value) => value instanceof Date && !isNaN(value.getTime());
export const isValidDate = (value) => isDate(value);
export const isInvalidDate = (value) => value instanceof Date && isNaN(value.getTime());

// RegExp type checkers
export const isRegExp = (value) => value instanceof RegExp;

// Error type checkers
export const isError = (value) => value instanceof Error;
export const isTypeError = (value) => value instanceof TypeError;
export const isReferenceError = (value) => value instanceof ReferenceError;
export const isSyntaxError = (value) => value instanceof SyntaxError;

// Promise type checkers
export const isPromise = (value) => value instanceof Promise;
export const isThenable = (value) => value !== null && typeof value === 'object' && typeof value.then === 'function';

// Symbol type checkers
export const isSymbol = (value) => typeof value === 'symbol';

// BigInt type checkers
export const isBigInt = (value) => typeof value === 'bigint';

// Utility functions
export const getType = (value) => {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) return 'array';
  if (value instanceof Date) return 'date';
  if (value instanceof RegExp) return 'regexp';
  if (value instanceof Error) return 'error';
  if (value instanceof Promise) return 'promise';
  return typeof value;
};

export const isType = (value, type) => {
  const valueType = getType(value);
  return valueType === type;
};

export const isOneOf = (value, types) => {
  if (!isArray(types)) return false;
  return types.some(type => isType(value, type));
};

export const isInstanceOf = (value, constructor) => {
  return value instanceof constructor;
};

export const isEqual = (a, b) => {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (a === undefined || b === undefined) return false;
  if (getType(a) !== getType(b)) return false;
  
  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => isEqual(item, b[index]));
  }
  
  if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => keysB.includes(key) && isEqual(a[key], b[key]));
  }
  
  return false;
};

// Validation helpers
export const validate = (value, validators) => {
  if (!isArray(validators)) return false;
  return validators.every(validator => {
    if (typeof validator === 'function') {
      return validator(value);
    }
    return false;
  });
};

export const createValidator = (validators) => {
  return (value) => validate(value, validators);
};

// Type guards
export const assertString = (value, message = 'Expected a string') => {
  if (!isString(value)) {
    throw new TypeError(message);
  }
  return value;
};

export const assertNumber = (value, message = 'Expected a number') => {
  if (!isNumber(value)) {
    throw new TypeError(message);
  }
  return value;
};

export const assertArray = (value, message = 'Expected an array') => {
  if (!isArray(value)) {
    throw new TypeError(message);
  }
  return value;
};

export const assertObject = (value, message = 'Expected an object') => {
  if (!isObject(value)) {
    throw new TypeError(message);
  }
  return value;
};

export const sign = (value) => {
    if (value !== 0) {
        return Math.sign(value)
    }
    return Object.is(value, -0) ? -1 : 1;
}

// Default export with all functions
export default {
  // Basic types
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isObject,
  isArray,
  isNull,
  isUndefined,
  isNullish,
  
  // Advanced types
  isInteger,
  isFloat,
  isPositive,
  isNegative,
  isZero,
  isFinite,
  isInfinite,
  
  // String utilities
  isEmptyString,
  isNonEmptyString,
  isWhitespace,
  isEmail,
  isUrl,
  
  // Array utilities
  isEmptyArray,
  isNonEmptyArray,
  hasLength,
  hasMinLength,
  hasMaxLength,
  
  // Object utilities
  isEmptyObject,
  isNonEmptyObject,
  hasProperty,
  hasProperties,
  
  // Date utilities
  isDate,
  isValidDate,
  isInvalidDate,
  
  // Other types
  isRegExp,
  isError,
  isTypeError,
  isReferenceError,
  isSyntaxError,
  isPromise,
  isThenable,
  isSymbol,
  isBigInt,
  
  // Utility functions
  getType,
  isType,
  isOneOf,
  isInstanceOf,
  isEqual,
  validate,
  createValidator,
  sign,
  
  // Type guards
  assertString,
  assertNumber,
  assertArray,
  assertObject,
};
