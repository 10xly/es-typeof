var assert = require("node:assert");
var typeOf = require("./index");

function test(val, expected, description) {
  try {
    assert.strictEqual(typeOf(val), expected);
    console.log("✅ Pass: " + description);
  } catch (e) {
    console.error("❌ Fail: " + description + " (Expected " + expected + ", got " + typeOf(val) + ")");
    process.exit(1);
  }
}

test(undefined, "undefined", "undefined");
test(true, "boolean", "boolean true");
test(false, "boolean", "boolean false");
test(42, "number", "integer");
test(NaN, "number", "NaN");
test("hello", "string", "string");

if (typeof Symbol === "function") {
  test(Symbol("foo"), "symbol", "symbol");
}

if (typeof BigInt === "function") {
  test(BigInt(10), "bigint", "bigint");
}

test(function () {}, "function", "standard function");
test(function* () {}, "function", "generator function");

try {
  var asyncFn = eval("(async function () {})");
  test(asyncFn, "function", "async function");
} catch (e) {}

try {
  var asyncGenFn = eval("(async function* () {})");
  test(asyncGenFn, "function", "async generator function");
} catch (e) {}

test({}, "object", "plain object");
test([], "object", "array");
test(null, "object", "null");
test(new Date(), "object", "date instance");
test(new String("hi"), "object", "string object wrapper");
test(/a/g, "object", "regexp");