# Awesome JavaScript Type Checker

A comprehensive and robust JavaScript type checking library that provides extensive type validation utilities for runtime type checking in JavaScript applications.

## Features

- **Comprehensive Type Checking**: 50+ type checking functions covering all JavaScript types
- **Advanced Validators**: Email, URL, date validation, and more
- **Type Guards**: Runtime type assertions with helpful error messages
- **Utility Functions**: Type comparison, validation composition, and more
- **Zero Dependencies**: Pure vanilla JavaScript with no external dependencies
- **Multiple Formats**: Supports CommonJS, ES Modules, and UMD
- **TypeScript Ready**: Includes TypeScript definitions
- **Well Tested**: Comprehensive test suite with 100+ test cases

## Installation

```bash
npm install awsome-javascript-typechecker
```

## Quick Start

```javascript
import { isString, isNumber, isArray, assertString } from 'awsome-javascript-typechecker';

// Basic type checking
console.log(isString('hello')); // true
console.log(isNumber(123)); // true
console.log(isArray([1, 2, 3])); // true

// Type guards with error handling
try {
  const name = assertString(userInput, 'Name must be a string');
  console.log(`Hello, ${name}!`);
} catch (error) {
  console.error('Invalid input:', error.message);
}
```

## API Reference

### Basic Type Checkers

```javascript
import {
  isString,      // Check if value is a string
  isNumber,      // Check if value is a finite number (excludes NaN, Infinity, -Infinity)
  isBoolean,     // Check if value is a boolean
  isFunction,    // Check if value is a function
  isObject,      // Check if value is a plain object
  isArray,       // Check if value is an array
  isNull,        // Check if value is null
  isUndefined,   // Check if value is undefined
  isNullish      // Check if value is null or undefined
} from 'awsome-javascript-typechecker';
```

### Advanced Type Checkers

```javascript
import {
  isInteger,     // Check if value is an integer
  isFloat,       // Check if value is a float
  isPositive,    // Check if value is a positive number
  isNegative,    // Check if value is a negative number
  isZero,        // Check if value is zero
  isFinite,      // Check if value is finite
  isInfinite     // Check if value is positive or negative infinity (excludes NaN)
} from 'awsome-javascript-typechecker';
```

### String Utilities

```javascript
import {
  isEmptyString,     // Check if string is empty
  isNonEmptyString,  // Check if string is not empty
  isWhitespace,      // Check if string contains only whitespace
  isEmail,           // Check if string is a valid email
  isUrl              // Check if string is a valid URL with http, https, or ftp protocol and valid domain
} from 'awsome-javascript-typechecker';

// Examples
console.log(isEmail('user@example.com')); // true
console.log(isUrl('https://example.com')); // true
console.log(isWhitespace('   \t\n')); // true
```

### Array Utilities

```javascript
import {
  isEmptyArray,      // Check if array is empty
  isNonEmptyArray,   // Check if array is not empty
  hasLength,         // Check if array has specific length
  hasMinLength,      // Check if array has minimum length
  hasMaxLength       // Check if array has maximum length
} from 'awsome-javascript-typechecker';

// Examples
console.log(hasLength([1, 2, 3], 3)); // true
console.log(hasMinLength([1, 2, 3], 2)); // true
console.log(isEmptyArray([])); // true
```

### Object Utilities

```javascript
import {
  isEmptyObject,     // Check if object is empty
  isNonEmptyObject,  // Check if object is not empty
  hasProperty,       // Check if object has specific property
  hasProperties      // Check if object has multiple properties
} from 'awsome-javascript-typechecker';

// Examples
const user = { name: 'John', age: 30 };
console.log(hasProperty(user, 'name')); // true
console.log(hasProperties(user, ['name', 'age'])); // true
console.log(isEmptyObject({})); // true
```

### Date Utilities

```javascript
import {
  isDate,        // Check if value is a Date object
  isValidDate,   // Check if Date is valid
  isInvalidDate  // Check if Date is invalid
} from 'awsome-javascript-typechecker';

// Examples
console.log(isDate(new Date())); // true
console.log(isValidDate(new Date('2023-01-01'))); // true
console.log(isInvalidDate(new Date('invalid'))); // true
```

### Error Type Checkers

```javascript
import {
  isError,           // Check if value is an Error
  isTypeError,       // Check if value is a TypeError
  isReferenceError,  // Check if value is a ReferenceError
  isSyntaxError      // Check if value is a SyntaxError
} from 'awsome-javascript-typechecker';
```

### Number Utilities

```javascript
import {
  sign,          // Get the sign of a number (-1, 0, or 1)
  isEven,        // Check if number is even
  isOdd,         // Check if number is odd
  isInteger,     // Check if value is an integer
  isPositive,    // Check if number is positive
  isNegative,    // Check if number is negative
  isFiniteNumber // Check if value is a finite number
} from 'awsome-javascript-typechecker';

// Examples
console.log(sign(42));    // 1
console.log(sign(-3.14)); // -1
console.log(sign(0));     // 1
console.log(sign(-0));    // -1
console.log(isEven(4));   // true
console.log(isOdd(5));    // true
```

### Promise and Async Utilities

```javascript
import {
  isPromise,  // Check if value is a Promise
  isThenable  // Check if value is thenable (has .then method)
} from 'awsome-javascript-typechecker';
```

### Modern JavaScript Types

```javascript
import {
  isSymbol,  // Check if value is a Symbol
  isBigInt   // Check if value is a BigInt
} from 'awsome-javascript-typechecker';
```

### Utility Functions

```javascript
import {
  getType,      // Get the type of a value as string
  isType,       // Check if value is of specific type
  isOneOf,      // Check if value is one of multiple types
  isInstanceOf, // Check if value is instance of constructor
  isEqual       // Deep equality check
} from 'awsome-javascript-typechecker';

// Examples
console.log(getType('hello')); // 'string'
console.log(isType(123, 'number')); // true
console.log(isOneOf('hello', ['string', 'number'])); // true
console.log(isEqual([1, 2, 3], [1, 2, 3])); // true
```

### Validation and Composition

```javascript
import {
  validate,        // Validate value against multiple validators
  createValidator  // Create a reusable validator function
} from 'awsome-javascript-typechecker';

// Examples
const validators = [isString, isNonEmptyString, isEmail];
console.log(validate('user@example.com', validators)); // true

const emailValidator = createValidator(validators);
console.log(emailValidator('user@example.com')); // true
```

### Type Guards (Runtime Assertions)

```javascript
import {
  assertString,  // Assert value is string, throw if not
  assertNumber,  // Assert value is number, throw if not
  assertArray,   // Assert value is array, throw if not
  assertObject   // Assert value is object, throw if not
} from 'awsome-javascript-typechecker';

// Examples
try {
  const name = assertString(userInput, 'Name must be a string');
  // name is guaranteed to be a string here
} catch (error) {
  console.error('Validation failed:', error.message);
}
```

## Usage Examples

### Form Validation

```javascript
import { isString, isEmail, isNumber, validate, createValidator } from 'awsome-javascript-typechecker';

const validateUser = createValidator([
  (user) => isObject(user),
  (user) => isString(user.name) && user.name.length > 0,
  (user) => isEmail(user.email),
  (user) => isNumber(user.age) && user.age > 0
]);

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
};

console.log(validateUser(user)); // true
```

### API Response Validation

```javascript
import { isArray, isObject, hasProperty, isString, isNumber } from 'awsome-javascript-typechecker';

function validateApiResponse(response) {
  if (!isObject(response)) {
    throw new Error('Response must be an object');
  }
  
  if (!hasProperty(response, 'data')) {
    throw new Error('Response must have data property');
  }
  
  if (!isArray(response.data)) {
    throw new Error('Data must be an array');
  }
  
  return response.data.every(item => 
    isObject(item) && 
    hasProperty(item, 'id') && 
    isString(item.name) && 
    isNumber(item.price)
  );
}
```

### Configuration Validation

```javascript
import { 
  isObject, 
  hasProperties, 
  isString, 
  isNumber, 
  isBoolean,
  assertString,
  assertNumber,
  assertBoolean
} from 'awsome-javascript-typechecker';

function validateConfig(config) {
  if (!isObject(config)) {
    throw new Error('Config must be an object');
  }
  
  if (!hasProperties(config, ['apiUrl', 'timeout', 'debug'])) {
    throw new Error('Config must have required properties');
  }
  
  const apiUrl = assertString(config.apiUrl, 'API URL must be a string');
  const timeout = assertNumber(config.timeout, 'Timeout must be a number');
  const debug = assertBoolean(config.debug, 'Debug must be a boolean');
  
  return { apiUrl, timeout, debug };
}
```

## Browser Support

This library supports all modern browsers and Node.js environments:

- **Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Node.js**: 12.0+

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build the library
npm run build

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### 1.0.0
- Initial release
- 50+ type checking functions
- Comprehensive test suite
- Multiple build formats (CommonJS, ES Modules, UMD)
- TypeScript definitions
