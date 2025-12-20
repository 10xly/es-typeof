var callBound = require("call-bound");
var $Object = require("es-object-atoms");
var TYPE = require("@extremejs/utils").TYPE;
var OBJECT_STRING_TAG = require("@extremejs/utils").OBJECT_STRING_TAG;
var $toStr = callBound("%Object.prototype.toString%");
var includes = require("lodash.includes");
var extractStringTag = require("extract-stringtag");

var hasBigInts = require("has-bigints");
var hasSymbols = require("has-symbols");

var functionStringTags = [
  OBJECT_STRING_TAG.FUNCTION,
  OBJECT_STRING_TAG.ASYNC_FUNCTION,
  OBJECT_STRING_TAG.GENERATOR_FUNCTION,
  "AsyncGeneratorFunction" // TODO: When AsyncGeneratorFunction is added to extremejs, update this line
];

function $checkIsPrimitiveWithStringTag(value, stringTag) {
  return !isTypeObject(value) && (extractStringTag($toStr(value)) === stringTag);
}

function isTypeUndefined(value) {
  return (function (undefined) {
    return value === undefined;
  })();
}

function isTypeBoolean(value) {
  return $checkIsPrimitiveWithStringTag(value, OBJECT_STRING_TAG.BOOLEAN);
}

function isTypeNumber(value) {
  return $checkIsPrimitiveWithStringTag(value, OBJECT_STRING_TAG.NUMBER);
}

function isTypeBigInt(value) {
  return hasBigInts() && $checkIsPrimitiveWithStringTag(value, OBJECT_STRING_TAG.BIG_INT);
}

function isTypeString(value) {
  return $checkIsPrimitiveWithStringTag(value, OBJECT_STRING_TAG.STRING);
}

function isTypeSymbol(value) {
  return hasSymbols() && $checkIsPrimitiveWithStringTag(value, OBJECT_STRING_TAG.SYMBOL);
}

function isTypeFunction(value) {
  return includes(functionStringTags, extractStringTag($toStr(value)));
}

function isTypeObject(value) {
  return ($Object(value) === value) && !isTypeFunction(value);
}

function typeOf(value) {
  if (isTypeUndefined(value)) {
    return TYPE.UNDEFINED;
  }
  if (isTypeBoolean(value)) {
    return TYPE.BOOLEAN;
  }
  if (isTypeNumber(value)) {
    return TYPE.NUMBER;
  }
  if (isTypeBigInt(value)) {
    return TYPE.BIGINT;
  }
  if (isTypeString(value)) {
    return TYPE.STRING;
  }
  if (isTypeSymbol(value)) {
    return TYPE.SYMBOL;
  }
  if (isTypeFunction(value)) {
    return TYPE.FUNCTION;
  }
  return TYPE.OBJECT;
}

module.exports = typeOf;