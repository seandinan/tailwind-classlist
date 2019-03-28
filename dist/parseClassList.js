'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = _parseClasses;

var _standaloneClasses = _interopRequireDefault(
  require('./constants/standaloneClasses')
);

var _adjustableClasses = _interopRequireDefault(
  require('./constants/adjustableClasses')
);

var _responsivePrefixes = _interopRequireDefault(
  require('./constants/responsivePrefixes')
);

var _stateVariantPrefixes = _interopRequireDefault(
  require('./constants/stateVariantPrefixes')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance');
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === '[object Arguments]'
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

var FLATTENED_STANDALONE_CLASSES = _standaloneClasses.default.reduce(function(
  a,
  b
) {
  return [].concat(_toConsumableArray(a), _toConsumableArray(b));
},
[]);

var ADJUSTABLE_CLASS_KEYS = Object.keys(_adjustableClasses.default);

var isPrefix = function isPrefix(val) {
  return (
    _responsivePrefixes.default.includes(val) ||
    _stateVariantPrefixes.default.includes(val)
  );
};

var isValidTailwindClass = function isValidTailwindClass(val) {
  return (
    FLATTENED_STANDALONE_CLASSES.includes(val) ||
    ADJUSTABLE_CLASS_KEYS.includes(val)
  );
};

var classNameRegex = /^-?[a-z:]+-/;

var isClassnameStart = function isClassnameStart(val) {
  return val.match(classNameRegex) && val.split(classNameRegex);
};

function _parseClasses(classList) {
  var extraClasses = [];
  var parsedClasses = classList
    .split(' ')
    .reduce(function(a, b) {
      var isStandaloneClass = FLATTENED_STANDALONE_CLASSES.includes(b);
      var isCompleteAdjustableClass = ADJUSTABLE_CLASS_KEYS.includes(b);

      if (isStandaloneClass || isCompleteAdjustableClass) {
        return [].concat(_toConsumableArray(a), [_defineProperty({}, b, true)]);
      }

      if (!isClassnameStart(b)) {
        extraClasses.push(b);
        return a;
      }

      var key = b.match(classNameRegex)[0];
      var value = b.split(classNameRegex)[1];

      var trim = function trim(val) {
        return val.slice(0, -1);
      };

      if (key.includes(':')) {
        var keys = key.split(':');

        if (keys.length === 2) {
          if (isPrefix(keys[0])) {
            return [].concat(_toConsumableArray(a), [
              _defineProperty(
                {},
                keys[0],
                _defineProperty({}, trim(keys[1]), value)
              ),
            ]);
          } else {
            extraClasses.push(b);
            return a;
          }
        } else if (keys.length === 3) {
          return [].concat(_toConsumableArray(a), [
            _defineProperty(
              {},
              keys[0],
              _defineProperty(
                {},
                keys[1],
                _defineProperty({}, trim(keys[2]), value)
              )
            ),
          ]);
        }

        return [].concat(_toConsumableArray(a), [
          _defineProperty({}, trim(key), value),
        ]);
      }

      if (isValidTailwindClass(trim(key))) {
        return [].concat(_toConsumableArray(a), [
          _defineProperty({}, trim(key), value),
        ]);
      } else {
        extraClasses.push(b);
        return a;
      }
    }, [])
    .reduce(mergeSubObject, {});
  return extraClasses.length > 0
    ? _objectSpread({}, parsedClasses, {
        extraClasses: extraClasses,
      })
    : parsedClasses;
}

function mergeSubObject(obj, subobj) {
  var key = Object.keys(subobj)[0];

  if (obj[key] && obj[key] instanceof Array) {
    return _objectSpread(
      {},
      obj,
      _defineProperty(
        {},
        key,
        [].concat(_toConsumableArray(obj[key]), [subobj[key]])
      )
    );
  } else if (obj[key]) {
    return _objectSpread(
      {},
      obj,
      _defineProperty({}, key, [obj[key], subobj[key]])
    );
  } else {
    return _objectSpread({}, obj, _defineProperty({}, key, subobj[key]));
  }
}
