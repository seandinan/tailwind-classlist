'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = mergeClassLists;

var _classList = _interopRequireDefault(require('./classList'));

var _parseClassList = _interopRequireDefault(require('./parseClassList'));

var _adjustableClasses = _interopRequireDefault(
  require('./constants/adjustableClasses')
);

var _standaloneClasses = _interopRequireDefault(
  require('./constants/standaloneClasses')
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

var includes = function includes(val) {
  return function(arr) {
    return arr.includes(val);
  };
};

var getCommonValues = function getCommonValues(arr1, arr2) {
  return arr1.filter(function(v) {
    return arr2.includes(v);
  });
};

function mergeClassLists() {
  var classLists = Array.prototype.slice
    .call(arguments)
    .map(_parseClassList.default); // Each successive classList object overwrites the previous one
  // Use the combinations in the constants files to determine whether or not something belongs to an overwrite family

  var result = classLists.reduce(function(a, b) {
    var classes = _objectSpread({}, a);

    Object.keys(b).forEach(function(key) {
      if (!classes[key]) {
        if (FLATTENED_STANDALONE_CLASSES.includes(key)) {
          var category = _standaloneClasses.default.filter(includes(key))[0];

          var matches = getCommonValues(Object.keys(classes), category);
          if (matches.length > 0) delete classes[matches[0]];
          classes[key] = b[key];
        } else {
          classes[key] = b[key];
        }
      } else {
        if (key === 'extraClasses') {
          classes[key] += ' '.concat(b[key]);
        } else if (FLATTENED_STANDALONE_CLASSES.includes(key)) {
          // It's fine as it is (value will just be `true`).
          return;
        } else if (ADJUSTABLE_CLASS_KEYS.includes(key)) {
          // Iterate through array of arrays to see where the value is
          var _category = _adjustableClasses.default[key].filter(
            includes(b[key])
          )[0];

          if (typeof classes[key] === 'string') {
            if (_category.includes(classes[key])) {
              // It needs to to be overwritten
              classes[key] = b[key];
            }
          } else if (classes[key] instanceof Array) {
            classes[key] = classes[key].map(function(existingVal) {
              if (_category.includes(existingVal)) {
                return b[key];
              } else return existingVal;
            });
          } else {
            console.error('unable to process key: ', key);
          }
        } else if (classes[key] instanceof Object) {
          classes[key] = (0, _parseClassList.default)(
            mergeClassLists(
              (0, _classList.default)(classes[key]),
              (0, _classList.default)(b[key])
            )
          );
        } else {
          console.error('unable to process key: ', key);
        }
      }
    });
    return classes;
  }, {});
  return (0, _classList.default)(result);
}
