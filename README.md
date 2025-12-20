# es-typeof

A robust ponyfill for the JavaScript `typeof` operator. It replicates the exact logic of the native `typeof` operator while ensuring stability across different environments and realms.

## Installation

```bash
npm install es-typeof
```

## Usage

```javascript
var typeOf = require("es-typeof")

typeOf(undefined)     // "undefined"
typeOf(null)          // "object"
typeOf(true)          // "boolean"
typeOf(42)            // "number"
typeOf("hello")       // "string"
typeOf(Symbol("foo")) // "symbol"
typeOf(BigInt(10))    // "bigint"
typeOf(function() {}) // "function"
typeOf({})            // "object"
typeOf([])            // "object"
```

## Why use this instead of native `typeof`?

While it behaves the same as the `typeof` keyword, this library is built using `get-intrinsic` and `call-bound`. This makes it resistant to environments where global prototypes or constructors have been modified. It also ensures that functions like `AsyncFunction` and `GeneratorFunction` are consistently identified even in older or exotic engines.

## Testing

The library includes a comprehensive test suite covering primitives, modern types (Symbols/BigInts), and various function types.

```bash
node test.js
```

## License

Unlicense